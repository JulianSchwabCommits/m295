import express from 'express';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import { requireAuth } from './middleware/auth.js';
import { tasks } from './data/defaults.js';

const swaggerDocument = JSON.parse(
  readFileSync(new URL('./swagger-output.json', import.meta.url), 'utf-8')
);

const app = express();
app.use(express.json());

app.use(
  session({
    secret: 'sdföljk',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);
app.use('/tasks', requireAuth, tasksRoutes);

app.listen(3000, () => {
  console.log('UUID:', tasks[0].id);
  console.log('Swagger UI: http://localhost:3000/api-docs');
});
