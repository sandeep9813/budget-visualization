import express from 'express';
import { getProvinceBudgets, addProvinceBudget } from '../controllers/provinceBudgetController.js';

const router = express.Router();

// GET all province budgets
router.get('/', getProvinceBudgets);

// POST a new province budget
router.post('/', addProvinceBudget);

export default router;
