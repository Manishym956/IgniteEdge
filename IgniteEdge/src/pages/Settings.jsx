import React, { useEffect, useState } from 'react';
import '../styles/Settings.css';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({ darkMode: false, notifications: true, language: 'en' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('/api/auth/settings', { withCredentials: true });
      if (res.data.success) {
        setSettings(res.data.settings);
        setName(res.data.name);
        setEmail(res.data.email);
      }
    } catch (err) {
      setMessage('Failed to load settings');
    }
  };

  const handleSettingsChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('/api/auth/settings', { settings, name, email }, { withCredentials: true });
      if (res.data.success) setMessage('Settings updated!');
      else setMessage('Failed to update settings');
    } catch (err) {
      setMessage('Failed to update settings');
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // You should implement this endpoint in your backend
      const res = await axios.post('/api/auth/change-password', passwords, { withCredentials: true });
      if (res.data.success) setMessage('Password changed!');
      else setMessage(res.data.message || 'Failed to change password');
    } catch (err) {
      setMessage('Failed to change password');
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
      <h2 className="settings-title">Settings</h2>
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
        <input type="checkbox" checked={settings.darkMode} onChange={e => handleSettingsChange('darkMode', e.target.checked)} />
      </div>
      <div className="settings-section settings-toggle-row">
        <label className="settings-label">Notifications</label>
        <input type="checkbox" checked={settings.notifications} onChange={e => handleSettingsChange('notifications', e.target.checked)} />
      </div>
      <div className="settings-section">
        <label className="settings-label">Language</label>
        <select className="settings-input" value={settings.language} onChange={e => handleSettingsChange('language', e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
        </select>
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