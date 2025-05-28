import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import TeamRole from '../models/TeamRole.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get settings route
router.get('/settings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      settings: user.settings,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update settings route
router.post('/settings', auth, async (req, res) => {
  try {
    const { settings, name, email } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user settings and info
    user.settings = settings;
    user.name = name;
    user.email = email;
    await user.save();

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Change password route
router.post('/change-password', auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get team roles route
router.get('/team-roles', auth, async (req, res) => {
  try {
    const roles = await TeamRole.find({ createdBy: req.user.id });
    res.json({ success: true, roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add team role route
router.post('/add-team-role', auth, async (req, res) => {
  try {
    const { email, designation } = req.body;

    // Check if role already exists
    const existingRole = await TeamRole.findOne({ email });
    if (existingRole) {
      return res.status(400).json({ success: false, message: 'Team role already exists for this email' });
    }

    // Create new team role
    const teamRole = new TeamRole({
      email,
      designation,
      createdBy: req.user.id
    });

    await teamRole.save();
    res.json({ success: true, message: 'Team role added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Remove team role route
router.delete('/team-role/:id', auth, async (req, res) => {
  try {
    const role = await TeamRole.findOne({ _id: req.params.id, createdBy: req.user.id });
    
    if (!role) {
      return res.status(404).json({ success: false, message: 'Team role not found' });
    }

    await role.remove();
    res.json({ success: true, message: 'Team role removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router; 