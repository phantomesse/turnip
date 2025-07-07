import { GoogleGenAI } from "@google/genai";

/** Max number of books to suggest. */
const _MAX_BOOK_COUNT = 5;

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

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
