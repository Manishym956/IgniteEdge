import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  dueDate: { type: Date },
  assignee: { type: String, trim: true }, // user email
  status: { type: String, default: 'To Do', enum: ['To Do', 'In Progress', 'Done'] },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task; 