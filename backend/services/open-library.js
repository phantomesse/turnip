import { Book } from "../models/book.js";
import { get } from "../utils/https.js";

/**
 * @param {string} query
 * @param {number} maxBookCount max number of books to return
 * @returns {Promise<Book[]>} books
 */
export async function search(query, maxBookCount) {
  try {
    const docs = JSON.parse(
      await get("https://openlibrary.org/search.json", {
        q: encodeURI(query),
        fields: "key,isbn,title,author_name,cover_i",
        limit: maxBookCount,
      })
    ).docs;

    return Promise.all(
      docs.map(async (doc) => {
        const isbn = doc.isbn[0];
        const coverImageUrl = doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        const description = await getBookDescription(doc.key);

        return new Book(
          isbn,
          doc.title,
          doc.author_name,
          coverImageUrl,
          description
        );
      })
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * @param {string} key provided by the `search` API (e.g. "/works/OL17352669W")
 * @returns {Promise<string>} description of the given book
 */
async function getBookDescription(key) {
  try {
    const work = JSON.parse(await get(`https://openlibrary.org${key}.json`));
    return work.description?.value ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
}
