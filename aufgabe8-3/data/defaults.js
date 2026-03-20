export const books = [
  { isbn: "978-3-16-148410-0", title: "Der Prozess", year: 1925, author: "Franz Kafka" },
  { isbn: "978-0-7432-7356-5", title: "The Great Gatsby", year: 1925, author: "F. Scott Fitzgerald" },
  { isbn: "978-0-14-028329-7", title: "Of Mice and Men", year: 1937, author: "John Steinbeck" },
  { isbn: "978-0-06-112008-4", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee" },
  { isbn: "978-0-452-28423-4", title: "1984", year: 1949, author: "George Orwell" },
];

export const lends = [
  { id: crypto.randomUUID(), customerId: "1", isbn: "978-0-7432-7356-5", borrowedAt: new Date().toISOString(), returnedAt: null },
];

export const users = [
  { email: "desk@library.example", password: "m295" },
];
