import { Type } from "@google/genai";
import { askGemini } from "../services/google-gemini.js";

const _MAX_TAG_COUNT = 10;

/**
 * Generate tags for a book based on the content of the book.
 *
 * @param {string} title
 * @param {string} author
 * @returns {Promise<string[]>}
 */
export default async function getBookTags(title, author) {
  const response = askGemini(
    `
    List ${_MAX_TAG_COUNT} tropes or themes related to the book "${title}" by
    ${author}. Do not exceed 32 characters for each list item.
    `,
    {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    }
  );
  return response;
}
