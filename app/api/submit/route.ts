import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SpeechFormat, mergeSpeechData, cleanseFormData, safetySettings } from "./prompt";

export type ResponseData = {
  message: string;
  result1?: string;
  result2?: string;
  result3?: string;
  errors?: string[];
  successCount: number;
}

const API_KEYS = [
  process.env.GEMINI_API_KEY_1!,
  process.env.GEMINI_API_KEY_2!,
  process.env.GEMINI_API_KEY_3!
];

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
const handleModelResponses = (result1: string, result2: string, result3: string): ResponseData => {
  const response: ResponseData = { 
    message: 'Form processed successfully',
    errors: [],
    successCount: 0
  };

  // Track successful results
  if (!result1.startsWith("Error:")) {
    response.result1 = result1;
    response.successCount++;
  } else {
    response.errors?.push(result1);
  }

  if (!result2.startsWith("Error:")) {
    response.result2 = result2;
    response.successCount++;
  } else {
    response.errors?.push(result2);
  }

  if (!result3.startsWith("Error:")) {
    response.result3 = result3;
    response.successCount++;
  } else {
    response.errors?.push(result3);
  }

  if (response.successCount > 0) {
    if (response.errors?.length === 0) {
      delete response.errors;
    }
    return response;
  }

  return {
    message: 'All model calls failed',
    errors: response.errors,
    successCount: 0
  };
};

async function callModelSafely(modelName: string, input: string): Promise<string> {
  const overloadError = "The AI model is currently overloaded. Please try again in a few minutes.";
  let lastError: any;

  // Start with a random API key
  const startIndex = API_KEYS.indexOf(getRandomApiKey());
  
  for (let i = 0; i < API_KEYS.length; i++) {
    const currentIndex = (startIndex + i) % API_KEYS.length;
    const apiKey = API_KEYS[currentIndex];
    
    try {
      console.log(`[${modelName}] Trying with API key ${apiKey.substring(10, 14)}...`);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName, safetySettings });
      const result = await model.generateContent(input);
      const response = result.response.text();
      console.log(`[${modelName}] Success! Generated ${response.length} characters`);
      return response;
    } catch (error) {
      lastError = error;
      console.log(`[${modelName}] Error with key ${apiKey.substring(10, 14)}...`, error);
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

    const formData = await req.json();
    const cleansedFormData = cleanseFormData(formData);
    
    const [result1, result2, result3] = await Promise.all([
      callModelSafely("gemini-1.5-pro", mergeSpeechData(SpeechFormat, cleansedFormData)),
      callModelSafely("", mergeSpeechData(SpeechFormat, cleansedFormData, " Make the speech FUNNY.")),
      callModelSafely("", mergeSpeechData(SpeechFormat, cleansedFormData, " Make the speech SENTIMENTAL."))
    ]);

    const response = handleModelResponses(result1, result2, result3);
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