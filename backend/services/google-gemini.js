import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

/** Max number of books to suggest. */
const _MAX_BOOK_COUNT = 5;

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

/**
 * @param {string} prompt
 * @param {Object} responseSchema
 * @returns {Promise<string>} Gemini response
 */
export async function askGemini(prompt, responseSchema) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  return JSON.parse(response.text);
}
