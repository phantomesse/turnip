export class Book {
  /**
   * @param {string} id usually the ISBN
   * @param {string} title
   * @param {string[]} authors
   * @param {string} coverImageUrl
   * @param {string} description
   */
  constructor(id, title, authors, coverImageUrl, description) {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.coverImageUrl = coverImageUrl;
    this.description = description;
  }
}
