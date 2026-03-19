import express from "express";
import bookRoutes from './routes/book.js';
import lendRoutes from './routes/lend.js';

const app = express();
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/lends', lendRoutes);

app.listen(3000);
