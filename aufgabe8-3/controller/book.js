import { books } from '../data/defaults.js';

function validate(body) {
  const { isbn, title, year, author } = body;
  if (!isbn || !title || !year || !author) {
    return "isbn, title, year, author are required";
  }
  return null;
}

export function getAllBooks(req, res) {
  res.status(200).json(books);
}

export function getBookById(req, res) {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
}

export function createBook(req, res) {
  const error = validate(req.body);
  if (error) return res.status(422).json({ message: error });

  const exists = books.find((b) => b.isbn === req.body.isbn);
  if (exists) return res.status(409).json({ message: "Book with this ISBN already exists" });

  const book = { isbn: req.body.isbn, title: req.body.title, year: req.body.year, author: req.body.author };
  books.push(book);
  res.status(201).json(book);
}

export function updateBook(req, res) {
  const error = validate(req.body);
  if (error) return res.status(422).json({ message: error });

  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const book = { isbn: req.body.isbn, title: req.body.title, year: req.body.year, author: req.body.author };
  books[index] = book;
  res.status(200).json(book);
}

export function deleteBook(req, res) {
  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books.splice(index, 1);
  res.status(204).send();
}

export function patchBook(req, res) {
  const index = books.findIndex((b) => b.isbn === req.params.isbn);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const updated = { ...books[index], ...req.body };
  const error = validate(updated);
  if (error) return res.status(422).json({ message: error });

  books[index] = updated;
  res.status(200).json(updated);
}
