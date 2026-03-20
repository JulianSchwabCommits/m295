import { books, lends, users } from '../data/defaults.js';

export function getAllLends(req, res) {
  res.status(200).json(lends);
}

export function getLendById(req, res) {
  const lend = lends.find((l) => l.id === req.params.id);
  if (!lend) {
    return res.status(404).json({ error: 'Lend not found' });
  }
  res.status(200).json(lend);
}

export function createLend(req, res) {
  const { customerId, isbn } = req.body ?? {};

  if (!customerId || !isbn) {
    return res.status(400).json({ error: 'customerId and isbn are required' });
  }

  // only allow lending for yourself
  if (customerId !== req.session.email) {
    return res.status(403).json({ error: 'You can only lend books for yourself' });
  }

  // customerId must be a known user
  const knownUser = users.find((u) => u.email === customerId);
  if (!knownUser) {
    return res.status(403).json({ error: 'Unknown customer' });
  }

  const book = books.find((b) => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const existingLend = lends.find(
    (l) => l.isbn === isbn && l.returnedAt === null
  );
  if (existingLend) {
    return res.status(409).json({ error: 'Book is already lent out' });
  }

  const lend = {
    id: crypto.randomUUID(),
    customerId,
    isbn,
    borrowedAt: new Date().toISOString(),
    returnedAt: null,
  };
  lends.push(lend);
  res.status(201).json(lend);
}

export function deleteLend(req, res) {
  const index = lends.findIndex((l) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lend not found' });
  }
  lends.splice(index, 1);
  res.status(204).send();
}
