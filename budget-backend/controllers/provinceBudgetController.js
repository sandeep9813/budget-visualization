import ProvinceBudget from '../models/ProvinceBudget.js';

export const getProvinceBudgets = async (req, res) => {
  try {
    const budgets = await ProvinceBudget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProvinceBudget = async (req, res) => {
  const newBudget = new ProvinceBudget(req.body);
  try {
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
