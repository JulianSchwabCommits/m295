import express from "express";
import bookRoutes from './bookRoutes.js';

const app = express();
app.use(express.json());

app.use('/books', bookRoutes);

app.listen(3000);
