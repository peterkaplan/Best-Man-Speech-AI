import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SpeechFormat, mergeSpeechData, cleanseFormData, safetySettings } from "./prompt";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = 'force-dynamic';

export type ResponseData = {
  message: string;
  result1?: string;
  result2?: string;
  result3?: string;
  errors?: string[];
  successCount: number;
}

// Distinct style directions so the 3 parallel generations read as genuinely
// different speeches rather than 3 random samples of the same prompt.
const STYLE_SUFFIXES = [
  '',
  'Write this version with a warm, heartfelt tone that leans into the emotional and sentimental side of the story.',
  'Write this version with a witty, playful tone that leans into humor and comedic pacing.',
];

// Filter out any undefined keys to prevent errors
const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter((key): key is string => !!key);

if (API_KEYS.length === 0) {
  console.error("CRITICAL: No Gemini API keys found. Please check your .env file and restart the server.");
}

// Per-IP sliding window limiter. This is in-memory, so it only limits requests
// within a single serverless instance and resets on cold starts - it's a stopgap
// against casual abuse, not a hard guarantee. A real fix needs shared state (e.g. Upstash Redis).
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recentTimestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  requestLog.set(ip, recentTimestamps);
  return false;
}

function getRandomApiKey(): string {
  const randomIndex = Math.floor(Math.random() * API_KEYS.length);
  return API_KEYS[randomIndex];
}

function isRetryableError(error: any): boolean {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    // errorMessage.includes("overloaded")  not retrtyable  errorMessage.includes("error fetching") || 
    return errorMessage.includes("exhausted");
  }
  return false;
}
async function callModelSafely(modelName: string, input: string): Promise<string> {
  if (API_KEYS.length === 0) {
    const errorMessage = "Error: Server is not configured with API keys. Please contact support.";
    console.error(`[${modelName}] ${errorMessage}`);
    return errorMessage;
  }

  const overloadError = "The AI model is currently overloaded. Please try again in a few minutes.";
  let lastError: any;

  console.log(`[${modelName}] Calling model with input: ${input}`);

  // Start with a random API key
  const startIndex = API_KEYS.indexOf(getRandomApiKey());
  
  for (let i = 0; i < API_KEYS.length; i++) {
    const currentIndex = (startIndex + i) % API_KEYS.length;
    const apiKey = API_KEYS[currentIndex];

    // This check should no longer be necessary due to the filter above, but it's good practice
    if (!apiKey) {
      console.log(`[${modelName}] Skipped an undefined API key.`);
      continue;
    }
    
    try {
      console.log(`[${modelName}] Trying with API key ending in ...${apiKey.slice(-4)}`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName, safetySettings });
      const result = await model.generateContent(input);
      const response = result.response.text();
      console.log(`[${modelName}] Success! Generated ${response.length} characters`);
      return response;
    } catch (error) {
      lastError = error;
      console.log(`[${modelName}] Error with key ending in ...${apiKey.slice(-4)}`, error);
      if (!isRetryableError(error)) {
        console.log(`[${modelName}] Non-retryable error encountered, stopping retry attempts`);
        break;
      }
      console.log(`[${modelName}] Retryable error encountered, will try next API key`);
    }
  }

  console.error(`[${modelName}] All attempts failed:`, lastError);
  return `Error: Failed to generate content with ${modelName}. ${lastError instanceof Error ? lastError.message : String(lastError)}`;
}

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  console.log("Starting POST request processing");
  try {
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed', successCount: 0 },
        { status: 405 }
      );
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { message: 'Too many requests. Please wait a while before trying again.', successCount: 0 },
        { status: 429 }
      );
    }

    const formData = await req.json();
    const cleansedFormData = cleanseFormData(formData);

    const [result1, result2, result3] = await Promise.all(
      STYLE_SUFFIXES.map((suffix) =>
        callModelSafely("gemini-2.5-flash", mergeSpeechData(SpeechFormat, cleansedFormData, suffix))
      )
    );

    const response: ResponseData = {
      message: 'Form processed successfully',
      successCount: 0,
    };
    const errors: string[] = [];

    if (!result1.startsWith("Error:")) {
      response.result1 = result1;
      response.successCount++;
    } else {
      errors.push(result1);
    }

    if (!result2.startsWith("Error:")) {
      response.result2 = result2;
      response.successCount++;
    } else {
      errors.push(result2);
    }

    if (!result3.startsWith("Error:")) {
      response.result3 = result3;
      response.successCount++;
    } else {
      errors.push(result3);
    }

    if (errors.length > 0) {
      response.errors = errors;
    }
    if (response.successCount === 0) {
      response.message = 'All model calls failed';
    }

    console.log(`Request completed with ${response.successCount} successful generations`);

    return NextResponse.json(
      response,
      { status: response.successCount > 0 ? 200 : 500 }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { 
        message: 'Internal Server Error', 
        errors: [String(error)],
        successCount: 0 
      },
      { status: 500 }
    );
  }
}