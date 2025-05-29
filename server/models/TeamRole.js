import mongoose from 'mongoose';

const teamRoleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['teamLead', 'projectManager', 'hr']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TeamRole', teamRoleSchema); 