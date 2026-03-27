import mongoose from 'mongoose';

const nationalBudgetSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  sectors: {
    Education: { type: Number, default: 0 },
    Health: { type: Number, default: 0 },
    Agriculture: { type: Number, default: 0 },
    Energy: { type: Number, default: 0 },
    Infrastructure_Transport: { type: Number, default: 0 },
    Social_Security: { type: Number, default: 0 },
    Defense: { type: Number, default: 0 },
    IT_Digital: { type: Number, default: 0 },
    Industry_Commerce: { type: Number, default: 0 },
    Provincial_Local: { type: Number, default: 0 }
  }
});

export default mongoose.model('NationalBudget', nationalBudgetSchema, 'nationalBudgets');
