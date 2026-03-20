import express from "express";
import session from "express-session";
import bookRoutes from './routes/book.js';
import lendRoutes from './routes/lend.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(session({
  secret: "gfsdlöj2345t",
  resave: false,
  saveUninitialized: false,
}));

app.use('/books', bookRoutes);
app.use('/lends', lendRoutes);
app.use(authRoutes);

app.listen(3000);
