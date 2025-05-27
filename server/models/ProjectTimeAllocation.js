import mongoose from "mongoose";

const projectTimeAllocationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  hoursAllocated: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const ProjectTimeAllocation = mongoose.model("ProjectTimeAllocation", projectTimeAllocationSchema);

export default ProjectTimeAllocation; 