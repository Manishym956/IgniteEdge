import mongoose from "mongoose";

const kpiTrendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  kpiName: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  threshold: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

const KPITrend = mongoose.model("KPITrend", kpiTrendSchema);

export default KPITrend; 