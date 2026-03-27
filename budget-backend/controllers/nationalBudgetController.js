import NationalBudget from '../models/NationalBudget.js';

// GET all national budgets
export const getNationalBudgets = async (req, res) => {
  try {
    const budgets = await NationalBudget.find().sort({ year: 1 }); // sorted by year
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new national budget
export const addNationalBudget = async (req, res) => {
  const { year, sectors } = req.body;

  if (!year || !sectors) {
    return res.status(400).json({ message: "Year and sectors are required" });
  }

  try {
    // Optional: prevent duplicates
    const exists = await NationalBudget.findOne({ year });
    if (exists) return res.status(400).json({ message: "Budget for this year already exists" });

    const newBudget = new NationalBudget({ year, sectors });
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
