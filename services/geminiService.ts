
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Google GenAI client using the API key strictly from environment variables
const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const askStudyBuddy = async (subject: string, question: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `You are a helpful and expert academic tutor at Excellence Academy. 
    A student is asking about ${subject}. 
    Question: ${question}
    Provide a clear, encouraging, and accurate answer suitable for a high school student.`;

    // Always use ai.models.generateContent to query GenAI with both model name and prompt
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Directly access the .text property on the GenerateContentResponse object
    return response.text || "I'm sorry, I couldn't process that question right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Study Buddy is currently unavailable. Please try again later.";
  }
};
