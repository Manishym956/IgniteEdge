import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  revenue: { type: Number, required: true },
  expense: { type: Number, required: true },
});

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;
