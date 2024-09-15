import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest): Promise<NextResponse> {
    console.log("Test endpoint hit");
    return NextResponse.json({ message: "Test successful" }, { status: 200 });
}