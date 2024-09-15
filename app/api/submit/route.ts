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

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function callModelSafely(modelName: string, input: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: modelName, safetySettings });
    const result = await model.generateContent(input);
    return result.response.text();
  } catch (error) {
    console.error(`Error calling ${modelName}:`, error);
    return `Error: Failed to generate content with ${modelName}. ${error instanceof Error ? error.message : String(error)}`;
  }
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