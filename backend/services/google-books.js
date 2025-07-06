import { google } from "googleapis";

const books = google.books("v1");

async function searchBooks(query) {
  const res = await books.volumes.list({
    q: query,
    maxResults: 10,
  });

  res.data.items.forEach((item) => {
    // console.log(item.volumeInfo.title, "-", item.volumeInfo.authors);
    console.log(item.volumeInfo.title);
    console.log(item.volumeInfo.subtitle);
    console.log(item.volumeInfo.authors);
    console.log(item.volumeInfo.averageRating);
    console.log(item.volumeInfo.imageLinks.thumbnail);
    console.log(item.volumeInfo.seriesInfo);
  });
}

searchBooks("claimed by shadow rosa lee");
