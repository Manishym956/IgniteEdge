import Automation from '../models/Automation.js';

export const createAutomation = async (req, res) => {
  try {
    const { project, trigger, action, config } = req.body;
    const automation = await Automation.create({ project, trigger, action, config });
    res.status(201).json(automation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAutomations = async (req, res) => {
  try {
    const { project } = req.query;
    const query = project ? { project } : {};
    const automations = await Automation.find(query);
    res.json(automations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAutomation = async (req, res) => {
  try {
    const automation = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!automation) return res.status(404).json({ message: 'Automation not found' });
    res.json(automation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAutomation = async (req, res) => {
  try {
    const automation = await Automation.findByIdAndDelete(req.params.id);
    if (!automation) return res.status(404).json({ message: 'Automation not found' });
    res.json({ message: 'Automation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// To be called from task controller or a scheduler
export const triggerAutomations = async (trigger, project, context) => {
  const automations = await Automation.find({ project, trigger });
  // For each automation, perform the action (pseudo-code)
  for (const automation of automations) {
    // Example: if (automation.action === 'send_notification') { ... }
    // You can expand this logic as needed
  }
}; 