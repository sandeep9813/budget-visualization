import mongoose from 'mongoose';

const provinceBudgetSchema = new mongoose.Schema({
  province: String,         // Name of the province
  year: Number,             // Budget year
  sectors: {
    Agriculture: Number,
    Health: Number,
    Infrastructure: Number,
    Industry_Manufacturing: Number,
    Education: Number,
    Tourism: Number,
    Social_Security: Number,
    Energy: Number,
    Environment_Forestry: Number
  }
});

export default mongoose.model('ProvinceBudget', provinceBudgetSchema);

