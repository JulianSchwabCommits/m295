import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

const books = [
  { isbn: "978-3-16-148410-0", title: "Der Prozess", year: 1925, author: "Franz Kafka" },
  { isbn: "978-0-7432-7356-5", title: "The Great Gatsby", year: 1925, author: "F. Scott Fitzgerald" },
  { isbn: "978-0-14-028329-7", title: "Of Mice and Men", year: 1937, author: "John Steinbeck" },
  { isbn: "978-0-06-112008-4", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee" },
  { isbn: "978-0-452-28423-4", title: "1984", year: 1949, author: "George Orwell" },
];

function validate(body) {
  const { isbn, title, year, author } = body;
  if (!isbn || !title || !year || !author) return false; // is there a better way of doing this?
  return true;
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
  if (!validate(req.body)) {
    return res.status(422).json({ message: "isbn, title, year, author are required" });
  }

  const exists = books.find((b) => b.isbn === req.body.isbn);
  if (exists) return res.status(409).json({ message: "Book with this ISBN already exists" });
  const book = { isbn: req.body.isbn, title: req.body.title, year: req.body.year, author: req.body.author };
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:isbn", (req, res) => {
  if (!validate(req.body)) {
    return res.status(422).json({ message: "isbn, title, year, author are required" });
  }
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
  const { isbn, title, year, author } = updated;
  if (!isbn || !title || !year || !author) {
    return res.status(422).json({ message: "isbn, title, year, author are required" });
  }

  books[index] = updated;
  res.status(200).json(updated);
});

app.listen(port, () => console.log("Running on Port " + port.toString()));
