import Project from '../models/Project.js';
import { sendMail } from '../config/email.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, members, owner } = req.body;
    const project = await Project.create({ title, description, members, owner });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    // Optionally filter by member or owner
    const { user } = req.query;
    const query = user ? { members: user } : {};
    const projects = await Project.find(query);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const inviteMember = async (req, res) => {
  try {
    const { email } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.members.includes(email)) {
      project.members.push(email);
      await project.save();
      // Send invitation email
      try {
        await sendMail({
          to: email,
          subject: `You have been invited to join project: ${project.title}`,
          text: `You have been invited to join the project "${project.title}".`,
          html: `<p>You have been invited to join the project <b>${project.title}</b>.</p>`
        });
      } catch (mailErr) {
        // Log but don't fail the request
        console.error('Failed to send invite email:', mailErr);
      }
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCustomStatuses = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ customStatuses: project.customStatuses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 