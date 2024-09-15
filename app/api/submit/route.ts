import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SpeechFormat, mergeSpeechData, cleanseFormData, safetySettings } from "./prompt";

export type ResponseData = {
  message: string;
  result1?: string;
  result2?: string;
  result3?: string;
  errors?: string[];
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
    return errorMessage.includes("overloaded") || errorMessage.includes("error fetching") || errorMessage.includes("exhausted");
  }
  return false;
}

async function callModelSafely(modelName: string, input: string): Promise<string> {
  const overloadError = "The AI model is currently overloaded. Please try again in a few minutes.";
  let lastError: any;

  // Start with a random API key
  const startIndex = API_KEYS.indexOf(getRandomApiKey());
  
  for (let i = 0; i < API_KEYS.length; i++) {
    const currentIndex = (startIndex + i) % API_KEYS.length;
    const apiKey = API_KEYS[currentIndex];
    
    try {
      console.log("trying with ", apiKey, modelName);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName, safetySettings });
      const result = await model.generateContent(input);
      return result.response.text();
    } catch (error) {
      lastError = error;
      console.log("Error, in model: maybe retrying", error);
      if (!isRetryableError(error)) {
        break; // If it's not an overload error, don't retry with other keys
      }
    }
  }

  console.error(`Error calling ${modelName}:`, lastError);
  return `Error: Failed to generate content with ${modelName}. ${lastError instanceof Error ? lastError.message : String(lastError)}`;
}

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  console.log("Hello");
  try {
    const formData = await req.json();

    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    const cleansedFormData = cleanseFormData(formData);
    console.log(cleansedFormData);

    const transformation1 = mergeSpeechData(SpeechFormat, cleansedFormData);
    const transformation2 = mergeSpeechData(SpeechFormat, cleansedFormData, " Make the speech FUNNY.");
    const transformation3 = mergeSpeechData(SpeechFormat, cleansedFormData, " Make the speech SENTIMENTAL.");

    const [result1, result2, result3] = await Promise.all([
      callModelSafely("gemini-1.5-pro", transformation1),
      callModelSafely("gemini-1.5-flash", transformation2),
      callModelSafely("gemini-1.5-flash", transformation3)
    ]);

    const response: ResponseData = { 
      message: 'Form processed successfully',
      errors: []
    };

    if (result1.startsWith("Error:")) response.errors?.push(result1);
    else response.result1 = result1;

    if (result2.startsWith("Error:")) response.errors?.push(result2);
    else response.result2 = result2;

    if (result3.startsWith("Error:")) response.errors?.push(result3);
    else response.result3 = result3;

    if (response.errors?.length === 0) delete response.errors;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', errors: [String(error)] },
      { status: 500 }
    );
  }
}