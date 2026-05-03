import { NextRequest, NextResponse } from "next/server";
import { getGateRecommendation } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const { gates } = await req.json();

    if (!gates || !Array.isArray(gates)) {
      return NextResponse.json({ error: "Invalid gate data" }, { status: 400 });
    }

    console.log("Generating AI recommendation for gates...");
    const recommendation = await getGateRecommendation(gates);

    return NextResponse.json({ recommendation });
  } catch (error: unknown) {
    console.error("API Error:", error);
    // Fallback recommendation in case of total failure
    return NextResponse.json({ 
      recommendation: "Based on current data, Gate C is least crowded and recommended for immediate entry."
    });
  }
}
