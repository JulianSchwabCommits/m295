import express from 'express';
import session from 'express-session';

import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import { requireAuth } from './middleware/auth.js';
import { tasks } from './data/defaults.js';

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
app.use('/tasks', requireAuth, tasksRoutes);

app.listen(3000, () => {
  console.log('UUID:', tasks[0].id);
});
