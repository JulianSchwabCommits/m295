import express from "express";
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

const app = express();
app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000;

const books = [
  { isbn: "978-3-16-148410-0", title: "Der Prozess", year: 1925, author: "Franz Kafka" },
  { isbn: "978-0-7432-7356-5", title: "The Great Gatsby", year: 1925, author: "F. Scott Fitzgerald" },
  { isbn: "978-0-14-028329-7", title: "Of Mice and Men", year: 1937, author: "John Steinbeck" },
  { isbn: "978-0-06-112008-4", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee" },
  { isbn: "978-0-452-28423-4", title: "1984", year: 1949, author: "George Orwell" },
];

async function lookupISBN(isbn) {
  const response = await fetch(`https://openlibrary.org/search.json?isbn=${isbn}&fields=title,first_publish_year,author_name`);
  const data = await response.json();
  const book = data.docs?.[0];
  if (!book) return null;
  return {
    isbn,
    title: book.title,
    year: book.first_publish_year,
    author: book.author_name?.[0] ?? "Unknown",
  };
}

function validate(body) {
  const { isbn, title, year, author } = body;
  if (!isbn || !title || !year || !author) return "isbn, title, year, author are required";
  return null;
}


app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:isbn", (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(422).json({ message: error });

  const exists = books.find((b) => b.isbn === req.body.isbn);
  if (exists) return res.status(409).json({ message: "Book with this ISBN already exists" });
  const book = { isbn: req.body.isbn, title: req.body.title, year: req.body.year, author: req.body.author };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:isbn", (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(422).json({ message: error });
  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  const book = { isbn: req.body.isbn, title: req.body.title, year: req.body.year, author: req.body.author };
  books[index] = book;
  res.status(200).json(book);
});

app.delete("/books/:isbn", (req, res) => {
  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books.splice(index, 1);
  res.status(204).send();
});

app.patch("/books/:isbn", (req, res) => {
  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const updated = { ...books[index], ...req.body };
  const error = validate(updated);
  if (error) return res.status(422).json({ message: error });

  books[index] = updated;
  res.status(200).json(updated);
});

app.get("/test/:isbn", async (req, res) => {
  const isbn = req.query.isbn;
  const data = await lookupISBN(isbn);
  res.status(200).json(data);
})





// lend
const lends = [{ id: crypto.randomUUID(), customerId: "1", isbn: "978-0-7432-7356-5", borrowedAt: new Date().toISOString(), returnedAt: null }];

app.get("/lends", (req, res) => {
  res.status(200).json(lends);
});

app.get("/lends/:id", (req, res) => {
  const lend = lends.find((l) => l.id === req.params.id);
  if (!lend) return res.status(404).json({ error: "Lend not found" });
  res.status(200).json(lend);
});

function postlends(customerId, isbn) {
  const lend = {
    id: crypto.randomUUID(),
    customerId: customerId,
    isbn: isbn,
    borrowedAt: new Date().toISOString(),
    returnedAt: null
  };
  lends.push(lend);
  return lend;
}

app.post("/lends", (req, res) => {
  const customerId = req.body?.customerId;
  const isbn = req.body?.isbn;

  if (!customerId || !isbn) {
    return res.status(400).json({ error: "customerId and isbn are required" });
  }
  const book = books.find((b) => b.isbn === isbn);
  if (!book) return res.status(404).json({ error: "Book not found" });

  const existingLend = lends.find((l) => l.isbn === isbn && l.returnedAt === null);
  if (existingLend) return res.status(409).json({ error: "Book is already lent out" });

  const content = postlends(customerId, isbn);
  res.status(201).json(content);
});

app.delete("/lends/:id", (req, res) => {
  const index = lends.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Lend not found" });
  lends.splice(index, 1);
  res.status(200).json({ message: "its deleted" });
});

app.listen(port, () => console.log("Running on Port " + port.toString()));