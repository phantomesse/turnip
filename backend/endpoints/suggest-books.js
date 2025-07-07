import { User } from "../models/user.js";
import { Type } from "@google/genai";
import { askGemini } from "../services/google-gemini.js";

const _MAX_BOOK_COUNT = 5;

/**
 * Endpoint for suggest books given a user.
 *
 * @param {User} user
 */
export default async function suggestBooks(user) {
  const booksRead = user.books
    .filter((book) => book.status === "read")
    .map(
      (book) =>
        `\n\n* "${book.title}" by ${book.author}: ` +
        `I gave this book a ${book.rating}/5.` +
        (book.tags.length > 0
          ? ` I like the following about this book: ${book.tags.join(", ")}`
          : "")
    )
    .join("");

  const response = askGemini(
    `
    I have read the following books: ${booksRead}

    Suggest ${_MAX_BOOK_COUNT} books that I would be interested in reading next
    and why I would like each book.
    `,
    {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
          },
          author: {
            type: Type.STRING,
          },
          rationale: {
            type: Type.STRING,
          },
        },
      },
    }
  );

  return response;
}
