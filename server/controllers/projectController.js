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
    console.log('Inviting member:', email);
    
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.log('Project not found:', req.params.id);
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(email)) {
      project.members.push(email);
      await project.save();
      console.log('Member added to project:', email);
      
      // Send invitation email
      try {
        console.log('Sending invitation email to:', email);
        const mailResult = await sendMail({
          to: email,
          subject: `You have been invited to join project: ${project.title}`,
          text: `You have been invited to join the project "${project.title}" and have been assigned a task. Please log in to your account to view the details.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Project Invitation</h2>
              <p>Hello,</p>
              <p>You have been invited to join the project <b>${project.title}</b> and have been assigned a task.</p>
              <p>Please log in to your account to view the project details and your assigned tasks.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
                <p style="margin: 0;"><strong>Project:</strong> ${project.title}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${project.description || 'No description provided'}</p>
              </div>
              <p>Best regards,<br>The IgniteEdge Team</p>
            </div>
          `
        });
        console.log('Email sent successfully:', mailResult.messageId);
      } catch (mailErr) {
        console.error('Failed to send invite email:', {
          error: mailErr.message,
          stack: mailErr.stack,
          email,
          projectId: project._id
        });
        // Still return success to the client, but log the email error
      }
    } else {
      console.log('Member already in project:', email);
    }
    
    res.json(project);
  } catch (err) {
    console.error('Error in inviteMember:', {
      error: err.message,
      stack: err.stack,
      email: req.body.email,
      projectId: req.params.id
    });
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