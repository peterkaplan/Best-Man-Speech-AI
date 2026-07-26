import { expect, test, describe, vi, beforeEach, Mock, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { POST } from './route';

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
  mergeSpeechData: vi.fn((format, data) => `mock merged data`),
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

  // Each request uses a unique client IP so the rate limiter (5 req / 15 min
  // per IP) doesn't interfere between tests.
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
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    mockGenerateContent = vi.fn();
    genAIInstance = {
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: mockGenerateContent
      })
    };
    // Must be a function expression, not an arrow: route.ts calls
    // `new GoogleGenerativeAI(...)`, and as of Vitest 4 the mock implementation
    // is invoked directly, so an arrow function throws "is not a constructor".
    (GoogleGenerativeAI as Mock).mockImplementation(function () {
      return genAIInstance;
    });
  });

  test('handles a successful generation', async () => {
    const mockText = 'Generated Speech';
    mockGenerateContent.mockResolvedValueOnce({ response: { text: () => mockText } });

    const response = await POST(makeRequest(mockFormData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(1);
    expect(data.result1).toBe(mockText);
    expect(data.errors).toBeUndefined();
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  test('retries on a retryable error and succeeds on the second attempt', async () => {
    const mockText = 'Generated Speech';
    mockGenerateContent
      .mockRejectedValueOnce(new Error('Quota exhausted for this key'))
      .mockResolvedValueOnce({ response: { text: () => mockText } });

    const response = await POST(makeRequest(mockFormData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.successCount).toBe(1);
    expect(data.result1).toBe(mockText);
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  }, 10000);

  test('does not retry a non-retryable error', async () => {
    mockGenerateContent.mockRejectedValueOnce(new Error('Candidate was blocked due to SAFETY'));

    const response = await POST(makeRequest(mockFormData));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.successCount).toBe(0);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  test('gives up after exhausting all retry attempts', async () => {
    const error = new Error('Quota exhausted for this key');
    mockGenerateContent
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error);

    const response = await POST(makeRequest(mockFormData));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('Speech generation failed');
    expect(data.successCount).toBe(0);
    expect(data.errors).toHaveLength(1);
    expect(mockGenerateContent).toHaveBeenCalledTimes(3);
  }, 10000);

  test('handles method not allowed', async () => {
    const response = await POST(makeRequest(undefined, 'GET'));
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
    mockGenerateContent.mockResolvedValueOnce({ response: { text: () => mockText } });

    await POST(makeRequest(mockFormData));

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Request completed with 1 successful generations')
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
