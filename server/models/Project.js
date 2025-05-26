import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  members: [{ type: String, trim: true }], // user emails
  owner: { type: String, required: true, trim: true }, // user id or email
  customStatuses: {
    type: [String],
    default: ['To Do', 'In Progress', 'Done'],
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project; 