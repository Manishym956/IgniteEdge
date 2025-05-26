import mongoose from 'mongoose';

const profitLossSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  period: { 
    type: String, 
    required: true 
  },
  profitOrLoss: { 
    type: Number, 
    required: true 
  }
}, {
  timestamps: true
});

const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

export default ProfitLoss;
