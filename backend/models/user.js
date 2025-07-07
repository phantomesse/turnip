export class User {
  /**
   * @param {string} id
   * @param {string} username
   * @param {UserBook[]} books
   */
  constructor(id, username, books) {
    this.id = id;
    this.username = username;
    this.books = books;
  }
}

export class UserBook {
  /**
   * @param {string} title
   * @param {string} author
   * @param {1|2|3|4|5} rating
   * @param {"read"|"want to read"|"currently reading"} status
   * @param {string[]} tags
   */
  constructor(title, author, rating, status, tags) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.status = status;
    this.tags = tags;
  }
}
