import { Home, Users, Clipboard, Settings, LogOut, User } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import RevenueSection from "../components/RevenueSection.jsx";
import ProfitLossSection from "../components/ProfitLossSection.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:1600/api/auth/logout', {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="section">
          <div className="avatar" style={{ cursor: 'pointer' }} onClick={() => navigate('/Profile')}>
            <User size={32} />
          </div>
          <span className="name">{userName}</span>
        </div>

        <nav className="nav">
          <NavItem icon={<Home size={20} />} text="Home" active />
          <NavItem icon={<Users size={20} />} text="Employee" onClick={() => navigate('/EmployeeList')}/>
          <NavItem icon={<Clipboard size={20} />} text="Task Management" onClick={() => navigate('/projects')} />
          <NavItem icon={<Settings size={20} />} text="Settings" />
          <NavItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} />
        </nav>
      </div>

      <div className="main-content">
        <div className="dashboard-grid">
  <div className="dashboard-box">
    <h2 className="box-header">Revenue</h2>
    <RevenueSection />
  </div>

  <div className="dashboard-box">
    <h2 className="box-header">Profit & Loss</h2>
    <ProfitLossSection />
  </div>
</div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, active, onClick }) {
  return (
    <div
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="nav-icon">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

Modal.setAppElement('#root');