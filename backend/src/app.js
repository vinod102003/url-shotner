import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { redirectToOriginal } from './controllers/urlController.js';

dotenv.config();

const app = express();

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  }),
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'url-shortener', timestamp: new Date().toISOString() });
});

app.use('/api', urlRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Redirect handler for short URLs
app.get('/:shortcode', redirectToOriginal);

export default app;

