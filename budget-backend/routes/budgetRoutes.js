import express from "express";
import NationalBudget from "../models/NationalBudget.js";
import ProvinceBudget from "../models/ProvinceBudget.js";

const router = express.Router();

/* ---------------------- NATIONAL BUDGET ROUTES ---------------------- */

// GET all national budgets
router.get("/national", async (req, res) => {
  try {
    const budgets = await NationalBudget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or UPDATE a national budget for a given year
router.post("/national", async (req, res) => {
  try {
    const { year, sectors } = req.body;

    // Update if exists, else create new
    const budget = await NationalBudget.findOneAndUpdate(
      { year },
      { sectors },
      { new: true, upsert: true } // upsert = insert if not exists
    );

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------- PROVINCE BUDGET ROUTES ---------------------- */

// GET province budget
router.get("/province/:province", async (req, res) => {
  try {
    const { province } = req.params;
    const budgets = await ProvinceBudget.find({ province });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or UPDATE a province budget for a given year
router.post("/province/:province", async (req, res) => {
  try {
    const { province } = req.params;
    const { year, sectors } = req.body;

    const budget = await ProvinceBudget.findOneAndUpdate(
      { province, year },
      { sectors },
      { new: true, upsert: true }
    );

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
