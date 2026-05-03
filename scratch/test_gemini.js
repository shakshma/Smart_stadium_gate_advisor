const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key found:", !!apiKey);
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const models = ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-1.5-pro-latest", "gemini-1.5-flash-latest"];
  
  for (const modelName of models) {
    console.log(`Testing model: ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, respond with 'OK' if you are working.");
      console.log(`Model ${modelName} Response:`, result.response.text());
    } catch (error) {
      console.error(`Model ${modelName} Failed:`, error.message, error.status);
    }
  }
}

testGemini();
