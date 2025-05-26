import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { sendMail } from '../config/email.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignee, status, project } = req.body;
    const task = await Task.create({ title, description, dueDate, assignee, status, project });
    // Send assignment email if assignee
    if (assignee) {
      try {
        const proj = await Project.findById(project);
        await sendMail({
          to: assignee,
          subject: `You have been assigned a task: ${title}`,
          text: `You have been assigned the task "${title}" in project "${proj?.title || ''}".`,
          html: `<p>You have been assigned the task <b>${title}</b> in project <b>${proj?.title || ''}</b>.</p>`
        });
      } catch (mailErr) {
        console.error('Failed to send assignment email:', mailErr);
      }
    }
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { project } = req.query;
    const query = project ? { project } : {};
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const prevTask = await Task.findById(req.params.id);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Send assignment email if assignee changed
    if (req.body.assignee && req.body.assignee !== prevTask.assignee) {
      try {
        const proj = await Project.findById(task.project);
        await sendMail({
          to: req.body.assignee,
          subject: `You have been assigned a task: ${task.title}`,
          text: `You have been assigned the task "${task.title}" in project "${proj?.title || ''}".`,
          html: `<p>You have been assigned the task <b>${task.title}</b> in project <b>${proj?.title || ''}</b>.</p>`
        });
      } catch (mailErr) {
        console.error('Failed to send assignment email:', mailErr);
      }
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 