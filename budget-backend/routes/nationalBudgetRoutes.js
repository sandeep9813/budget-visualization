import express from 'express';
import { getNationalBudgets, addNationalBudget } from '../controllers/nationalBudgetController.js';

const router = express.Router();

// GET all national budgets
router.get('/', getNationalBudgets);

// POST a new national budget
router.post('/', addNationalBudget);

export default router;
