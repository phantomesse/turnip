import { Book } from "../models/book.js";
import { search } from "../services/open-library.js";

/** Max number of books to return. */
const _MAX_BOOK_COUNT = 5;

/**
 * Endpoint for finding books given a query.
 *
 * @param {string} query
 * @returns {Promise<Book[]>} a list of books that match the query
 */
export default async function findBook(query) {
  return search(query, _MAX_BOOK_COUNT);
}
