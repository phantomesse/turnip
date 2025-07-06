import { Book } from "../models/book.js";
import { search } from "../services/open-library.js";

/**
 * Endpoint for getting information about a given book by title and author.
 *
 * @param {string} title
 * @param {string} author
 * @returns {Promise<Book|null>}
 */
export default async function getBook(title, author) {
  const books = await search(`title:${title} author:${author}`, 1);
  return books.length > 0 ? books[0] : null;
}
