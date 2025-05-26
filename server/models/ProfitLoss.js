import mongoose from 'mongoose';

const profitLossSchema = new mongoose.Schema({
  period: { type: String, required: true },
  profitOrLoss: { type: Number, required: true },
});

const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

export default ProfitLoss;
