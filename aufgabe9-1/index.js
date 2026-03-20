import express from 'express';
import session from 'express-session';

import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';

const app = express();
app.use(express.json());

app.use(
  session({
    secret: 'sdföljk',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);
app.use('/tasks', tasksRoutes);

app.listen(3000);
