import { GoogleGenerativeAI } from "@google/generative-ai";

// Use verified working model alias
const PRIMARY_MODEL = "gemini-flash-latest"; 
const FALLBACK_MODEL = "gemini-pro-latest"; 

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const STADIUM_SYSTEM_PROMPT = `
You are a Smart Stadium AI Assistant. Your goal is to optimize crowd flow and suggest the best entry gates for fans.
Based on the provided gate status data, recommend the best gate to use.
Return your response as a JSON object with a single field: "recommendation".
Example: { "recommendation": "Gate C is your best bet! It has the lowest wait time of 4 minutes." }
`;

export async function getGateRecommendation(gates: any[]): Promise<string> {
  try {
    console.log(`Analyzing stadium gates with ${PRIMARY_MODEL}...`);
    const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });

    const prompt = `${STADIUM_SYSTEM_PROMPT}\n\nCurrent Gate Data: ${JSON.stringify(gates)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(result.response.text());
    return data.recommendation;
  } catch (error: any) {
    console.error(`Primary model ${PRIMARY_MODEL} failed.`, error.message);
    return await getFallbackRecommendation(gates);
  }
}

async function getFallbackRecommendation(gates: any[]): Promise<string> {
  try {
    console.log(`Trying fallback model ${FALLBACK_MODEL}...`);
    const model = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
    const prompt = `${STADIUM_SYSTEM_PROMPT}\n\nCurrent Gate Data: ${JSON.stringify(gates)}`;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(result.response.text());
    return data.recommendation;
  } catch (e: any) {
    console.warn("Critical: All AI models failed. Using hardcoded fallback.");
    // Hardcoded fallback as requested by user
    return "Based on current data, Gate C is least crowded and recommended for immediate entry.";
  }
}
