import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SpeechFormat, mergeSpeechData, cleanseFormData, safetySettings } from "./prompt";

export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = 'force-dynamic';

export type ResponseData = {
  message: string;
  result1?: string;
  errors?: string[];
  successCount: number;
}

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
    return errorMessage.includes("exhausted");
  }
  return false;
}

const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function callModelSafely(modelName: string, input: string): Promise<string> {
  if (API_KEYS.length === 0) {
    const errorMessage = "Error: Server is not configured with API keys. Please contact support.";
    console.error(`[${modelName}] ${errorMessage}`);
    return errorMessage;
  }

  let lastError: any;

  console.log(`[${modelName}] Calling model with input: ${input}`);

  // Rotate through available keys, retrying with exponential backoff on
  // retryable errors (e.g. quota exhaustion) up to MAX_ATTEMPTS total.
  const startIndex = API_KEYS.indexOf(getRandomApiKey());

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const apiKey = API_KEYS[(startIndex + attempt) % API_KEYS.length];

    try {
      console.log(`[${modelName}] Attempt ${attempt + 1}/${MAX_ATTEMPTS} with API key ending in ...${apiKey.slice(-4)}`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName, safetySettings });
      const result = await model.generateContent(input);
      const response = result.response.text();
      console.log(`[${modelName}] Success! Generated ${response.length} characters`);
      return response;
    } catch (error) {
      lastError = error;
      console.log(`[${modelName}] Error on attempt ${attempt + 1}:`, error);
      if (!isRetryableError(error)) {
        console.log(`[${modelName}] Non-retryable error encountered, stopping retry attempts`);
        break;
      }
      if (attempt < MAX_ATTEMPTS - 1) {
        const delay = RETRY_BASE_DELAY_MS * 2 ** attempt;
        console.log(`[${modelName}] Retryable error, backing off for ${delay}ms before next attempt`);
        await sleep(delay);
      }
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

    const result1 = await callModelSafely("gemini-2.5-flash", mergeSpeechData(SpeechFormat, cleansedFormData));

    const generationFailed = result1.startsWith("Error:");
    const response: ResponseData = {
      message: generationFailed ? 'Speech generation failed' : 'Form processed successfully',
      result1: generationFailed ? undefined : result1,
      errors: generationFailed ? [result1] : undefined,
      successCount: generationFailed ? 0 : 1
    };

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
