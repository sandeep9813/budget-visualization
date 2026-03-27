// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import budgetRoutes from './routes/budgetRoutes.js';
import nationalBudgetRoutes from './routes/nationalBudgetRoutes.js';
import provinceBudgetRoutes from './routes/provinceBudgetRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// CORS Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000', 'http://localhost:5173', '*'], // allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
  credentials: true
}));

// Body parser
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/nationalBudgets', nationalBudgetRoutes);
app.use('/api/provinceBudgets', provinceBudgetRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
