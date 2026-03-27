import Budget from '../models/NationalBudget.js';

// For GET /api/nationalBudgets
export const getNationalBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find(); // Fetch all documents
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// For POST /api/nationalBudgets (adding new budget)
export const addNationalBudget = async (req, res) => {
  const newBudget = new Budget(req.body);
  try {
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

