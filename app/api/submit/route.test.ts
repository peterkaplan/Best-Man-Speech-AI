import { expect, test, describe, vi, beforeEach, Mock, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { POST } from './route';
import { SpeechFormat, mergeSpeechData, cleanseFormData } from "./prompt";

// Mock environment variables
vi.stubEnv('GEMINI_API_KEY_1', 'test-key-1');
vi.stubEnv('GEMINI_API_KEY_2', 'test-key-2');
vi.stubEnv('GEMINI_API_KEY_3', 'test-key-3');

// Mock the GoogleGenerativeAI module
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn()
}));

// Mock the prompt module
vi.mock("./prompt", () => ({
  SpeechFormat: "mock speech format",
  mergeSpeechData: vi.fn((format, data, suffix) => `mock merged data ${suffix || ''}`),
  cleanseFormData: vi.fn(data => data),
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ]
}));

describe('POST Route Handler', () => {
  const mockFormData = {
    '0': { shortName: 'groomName', answer: 'Peter' },
    '1': { shortName: 'knownDuration', answer: '10 years' },
    '2': { shortName: 'howMet', answer: 'At university' }
  };

  let mockGenerateContent: Mock;
  let genAIInstance: {
    getGenerativeModel: Mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console mocks for each test
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Setup the mock response
    mockGenerateContent = vi.fn();
    genAIInstance = {
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: mockGenerateContent
      })
    };
    (GoogleGenerativeAI as Mock).mockImplementation(() => genAIInstance);
  });

  test('handles successful responses from all models', async () => {
    const mockText = 'Generated Speech';
    const mockResponse = { text: mockText };

    mockGenerateContent
      .mockResolvedValueOnce({ response: mockResponse })
      .mockResolvedValueOnce({ response: mockResponse })
      .mockResolvedValueOnce({ response: mockResponse });

    const request = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockFormData)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(3);
    expect(data.result1).toBe(mockText);
    expect(data.result2).toBe(mockText);
    expect(data.result3).toBe(mockText);
    expect(data.errors).toBeUndefined();
  });

  test('handles partial success (2 out of 3 models)', async () => {
    const mockText1 = 'Speech 1';
    const mockText2 = 'Speech 2';
    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => mockText1 } })
      .mockResolvedValueOnce({ response: { text: () => mockText2 } })
      .mockRejectedValueOnce(new Error('Model overloaded'));

    const request = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockFormData)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(2);
    expect(data.result1).toBe(mockText1);
    expect(data.result2).toBe(mockText2);
    expect(data.errors).toHaveLength(1);
  });

  test('handles complete failure (all models fail)', async () => {
    const error = new Error('Model overloaded');
    mockGenerateContent
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error);

    const request = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockFormData)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('All model calls failed');
    expect(data.successCount).toBe(0);
    expect(data.errors).toBeDefined();
    expect(data.errors).toHaveLength(3);
  });

  test('handles method not allowed', async () => {
    const request = new NextRequest('http://localhost', {
      method: 'GET'
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.message).toBe('Method Not Allowed');
    expect(data.successCount).toBe(0);
  });

  test('logs request completion with success count', async () => {
    const mockText = 'Generated Speech';
    const mockResponse = { text: mockText };

    mockGenerateContent
      .mockResolvedValueOnce({ response: mockResponse })
      .mockResolvedValueOnce({ response: mockResponse })
      .mockResolvedValueOnce({ response: mockResponse });

    const request = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify(mockFormData)
    });

    await POST(request);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Request completed with 3 successful generations')
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});