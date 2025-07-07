import express from "express";
import findBooks from "./backend/endpoints/find-books.js";
import getBook from "./backend/endpoints/get-book.js";
import getBookTags from "./backend/endpoints/get-book-tags.js";
import getUser from "./backend/endpoints/get-user.js";
import suggestBooks from "./backend/endpoints/suggest-books.js";
import addUser from "./backend/endpoints/add-user.js";

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("frontend"));

app.get("/api/get-book/:title/:author", (request, response) => {
  const title = decodeURI(request.params.title);
  const author = decodeURI(request.params.author);

  getBook(title, author).then((book) => response.send(book));
});

app.get("/api/get-book-tags/:title/:author", (request, response) => {
  const title = decodeURI(request.params.title);
  const author = decodeURI(request.params.author);

  getBookTags(title, author).then((tags) => response.send(tags));
});

app.put("/api/add-user/:username", (request, response) => {
  const username = request.params.username;

  addUser(username).then((user) => response.send(user));
});

app.get("/api/get-user/:userid", (request, response) => {
  const userId = request.params.userid;

  getUser(userId).then((user) => response.send(user));
});

app.get("/api/suggest-books/:userid", (request, response) => {
  const userId = request.params.userid;

  getUser(userId).then((user) =>
    suggestBooks(user).then((books) => response.send(books))
  );
});

app.get("/api/find-book/:query", (request, response) => {
  const query = decodeURI(request.params.query);

  findBooks(query).then((books) => response.send(books));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
