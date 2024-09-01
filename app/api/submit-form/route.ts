import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
  speechText?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {

    console.log("hello");
    // Parse the request body
    const formData = await req.json();

    console.log(formData);    
    // Validate the request method
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    // Process the form data
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate a simple speech based on the form data
    let speechText = `Thank you for your submission, ${formData[0]}! Here's a quick speech based on your answers...`;

    // Return the response
    return NextResponse.json(
      { message: 'Form submitted successfully', speechText },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
