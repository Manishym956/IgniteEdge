import mongoose from 'mongoose';

const automationSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  trigger: { type: String, required: true }, // e.g., 'task_moved', 'task_assigned', 'due_date_passed'
  action: { type: String, required: true }, // e.g., 'assign_badge', 'move_status', 'send_notification'
  config: { type: mongoose.Schema.Types.Mixed }, // flexible config for automation
}, { timestamps: true });

const Automation = mongoose.model('Automation', automationSchema);
export default Automation; 