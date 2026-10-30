import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import { errorHandler, notFound } from './middleware/error.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }), authRoutes);
app.use('/api/health', healthRoutes);
app.use(notFound);
app.use(errorHandler);

connectDatabase()
  .then(() => app.listen(port, () => console.log(`API listening on port ${port}`)))
  .catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  });
