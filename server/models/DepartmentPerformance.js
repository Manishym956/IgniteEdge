import mongoose from "mongoose";

const departmentPerformanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  scores: {
    type: Map,
    of: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const DepartmentPerformance = mongoose.model("DepartmentPerformance", departmentPerformanceSchema);

export default DepartmentPerformance; 