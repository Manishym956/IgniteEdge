import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
import axios from 'axios';

// Set the base URL for API calls
axios.defaults.baseURL = 'http://localhost:1600'; // Updated to match backend port

// Utility to set theme globally
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({ darkMode: false, notifications: true });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
    // Apply theme on mount
    const theme = localStorage.getItem('theme');
    setTheme(theme === 'dark');
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/auth/settings', { withCredentials: true });
      if (res.data.success) {
        setSettings(res.data.settings);
        setName(res.data.name || '');
        setEmail(res.data.email || '');
        // Update local storage or context with fetched name
        localStorage.setItem('userName', res.data.name);
      }
    } catch (err) {
      console.error('Settings fetch error:', err);
      setMessage('Failed to load settings');
    }
  };

  const handleSettingsChange = (field, value) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [field]: value };
      if (field === 'darkMode') {
        setTheme(value);
      }
      return newSettings;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('/api/auth/settings', {
        settings,
        name,
        email
      }, { withCredentials: true });

      if (res.data.success) {
        setMessage('Settings updated successfully!');
        // Update local storage or context with new name if needed
        localStorage.setItem('userName', name);
      } else {
        setMessage(res.data.message || 'Failed to update settings');
      }
    } catch (err) {
      console.error('Settings update error:', err);
      setMessage(err.response?.data?.message || 'Failed to update settings');
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate passwords
    if (passwords.new !== passwords.confirm) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    if (passwords.new.length < 6) {
      setMessage('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/auth/change-password', {
        oldPassword: passwords.old,
        newPassword: passwords.new
      }, { withCredentials: true });

      if (res.data.success) {
        setMessage('Password changed successfully!');
        setPasswords({ old: '', new: '', confirm: '' }); // Clear password fields
      } else {
        setMessage(res.data.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setMessage(err.response?.data?.message || 'Failed to change password');
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    setLoading(true);
    setMessage('');
    try {
      // You should implement this endpoint in your backend
      const res = await axios.post('/api/auth/delete', {}, { withCredentials: true });
      if (res.data.success) {
        setMessage('Account deleted.');
        window.location.href = '/';
      } else setMessage(res.data.message || 'Failed to delete account');
    } catch (err) {
      setMessage('Failed to delete account');
    }
    setLoading(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="settings-back-btn" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h2 className="settings-title">Settings</h2>
      </div>
      {message && <div className="settings-message">{message}</div>}
      <div className="settings-section">
        <label className="settings-label">Display Name</label>
        <input className="settings-input" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="settings-section">
        <label className="settings-label">Email</label>
        <input className="settings-input" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="settings-section settings-toggle-row">
        <label className="settings-label">Dark Mode</label>
        <label className="switch">
          <input type="checkbox" checked={settings.darkMode} onChange={e => handleSettingsChange('darkMode', e.target.checked)} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="settings-section settings-toggle-row">
        <label className="settings-label">Notifications</label>
        <input type="checkbox" checked={settings.notifications} onChange={e => handleSettingsChange('notifications', e.target.checked)} />
      </div>
      <button className="settings-save-btn" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Settings'}</button>
      <hr className="settings-divider" />
      <form className="settings-section" onSubmit={handlePasswordChange}>
        <label className="settings-label">Change Password</label>
        <input className="settings-input" type="password" placeholder="Old Password" value={passwords.old} onChange={e => setPasswords(p => ({ ...p, old: e.target.value }))} />
        <input className="settings-input" type="password" placeholder="New Password" value={passwords.new} onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))} />
        <input className="settings-input" type="password" placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
        <button className="settings-save-btn" type="submit" disabled={loading}>{loading ? 'Changing...' : 'Change Password'}</button>
      </form>
      <hr className="settings-divider" />
      <div className="settings-section">
        <button className="settings-delete-btn" onClick={handleDeleteAccount} disabled={loading}>Delete Account</button>
      </div>
    </div>
  );
};

export default Settings; 