import { expect, test, describe, vi, beforeEach, Mock, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { POST } from './route';
import { SpeechFormat, mergeSpeechData, cleanseFormData } from "./prompt";

// route.ts reads process.env.GEMINI_API_KEY_* into a module-level constant at
// import time, so the env vars must be set before the `import './route'` below
// runs. vi.hoisted() is guaranteed to execute before all imports; vi.stubEnv()
// here would run too late since import statements evaluate first.
vi.hoisted(() => {
  process.env.GEMINI_API_KEY_1 = 'test-key-1';
  process.env.GEMINI_API_KEY_2 = 'test-key-2';
  process.env.GEMINI_API_KEY_3 = 'test-key-3';
});

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

  // Each request makes 3 parallel calls (one per style variation), each with a
  // unique client IP so the rate limiter (5 req / 15 min per IP) doesn't
  // interfere between tests.
  let ipCounter = 0;
  const makeRequest = (body: unknown, method: string = 'POST') => {
    ipCounter++;
    return new NextRequest('http://localhost', {
      method,
      headers: { 'x-forwarded-for': `10.0.0.${ipCounter}` },
      body: method === 'POST' ? JSON.stringify(body) : undefined
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console mocks for each test
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Setup the mock response
    mockGenerateContent = vi.fn();
    genAIInstance = {
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: mockGenerateContent
      })
    };
    (GoogleGenerativeAI as Mock).mockImplementation(() => genAIInstance);
  });

  test('handles successful responses from all 3 style variations', async () => {
    const mockText = 'Generated Speech';

    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => mockText } })
      .mockResolvedValueOnce({ response: { text: () => mockText } })
      .mockResolvedValueOnce({ response: { text: () => mockText } });

    const request = makeRequest(mockFormData);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(3);
    expect(data.result1).toBe(mockText);
    expect(data.result2).toBe(mockText);
    expect(data.result3).toBe(mockText);
    expect(data.errors).toBeUndefined();
  });

  test('handles partial success (2 out of 3 variations)', async () => {
    const mockText1 = 'Speech 1';
    const mockText2 = 'Speech 2';
    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => mockText1 } })
      .mockResolvedValueOnce({ response: { text: () => mockText2 } })
      .mockRejectedValueOnce(new Error('Model overloaded'));

    const request = makeRequest(mockFormData);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(2);
    expect(data.result1).toBe(mockText1);
    expect(data.result2).toBe(mockText2);
    expect(data.errors).toHaveLength(1);
  });

  test('handles complete failure (all 3 variations fail)', async () => {
    const error = new Error('Model overloaded');
    mockGenerateContent
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error);

    const request = makeRequest(mockFormData);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('All model calls failed');
    expect(data.successCount).toBe(0);
    expect(data.errors).toBeDefined();
    expect(data.errors).toHaveLength(3);
  });

  test('handles method not allowed', async () => {
    const request = makeRequest(undefined, 'GET');

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.message).toBe('Method Not Allowed');
    expect(data.successCount).toBe(0);
  });

  test('rate limits repeated requests from the same IP', async () => {
    const mockText = 'Generated Speech';
    mockGenerateContent.mockResolvedValue({ response: { text: () => mockText } });

    const sameIpRequest = () =>
      new NextRequest('http://localhost', {
        method: 'POST',
        headers: { 'x-forwarded-for': '203.0.113.5' },
        body: JSON.stringify(mockFormData)
      });

    for (let i = 0; i < 5; i++) {
      const response = await POST(sameIpRequest());
      expect(response.status).toBe(200);
    }

    const limitedResponse = await POST(sameIpRequest());
    const data = await limitedResponse.json();

    expect(limitedResponse.status).toBe(429);
    expect(data.successCount).toBe(0);
  });

  test('logs request completion with success count', async () => {
    const mockText = 'Generated Speech';

    mockGenerateContent
      .mockResolvedValueOnce({ response: { text: () => mockText } })
      .mockResolvedValueOnce({ response: { text: () => mockText } })
      .mockResolvedValueOnce({ response: { text: () => mockText } });

    const request = makeRequest(mockFormData);

    await POST(request);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Request completed with 3 successful generations')
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
