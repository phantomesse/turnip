import express from "express";
import findBook from "./backend/endpoints/find-book.js";
import getBook from "./backend/endpoints/get-book.js";

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("frontend"));

app.get("/api/get-book/:title/:author", (request, response) => {
  const title = decodeURI(request.params.title);
  const author = decodeURI(request.params.author);

  getBook(title, author).then((book) => response.send(book));
});

app.get("/api/find-book/:query", (request, response) => {
  const query = decodeURI(request.params.query);

  findBook(query).then((books) => response.send(books));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
