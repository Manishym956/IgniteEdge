import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  revenue: {
    type: Number,
    required: true
  },
  expense: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;
