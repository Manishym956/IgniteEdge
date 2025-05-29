import { Home, Users, Clipboard, Settings, LogOut, User } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import RevenueSection from "../components/RevenueSection.jsx";
import ProfitLossSection from "../components/ProfitLossSection.jsx";
import ExpenseSection from "../components/ExpenseSection.jsx";
import DepartmentPerformanceSection from "../components/DepartmentPerformanceSection.jsx";
import ProjectTimeAllocationSection from "../components/ProjectTimeAllocationSection.jsx";
import KPITrendsSection from "../components/KPITrendsSection.jsx";
import GeoDistributionSection from "../components/GeoDistributionSection.jsx";
import ReminderBar from "../components/ReminderBar.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get('https://igniteedge-1.onrender.com/api/auth/logout', {
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
          <NavItem icon={<Settings size={20} />} text="Settings" onClick={() => navigate('/Settings')} />
          <NavItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} />
        </nav>
      </div>

      <div style={{ flex: 1 }}>
        <ReminderBar />
        <div className="main-content">
          <div className="dashboard-grid">
            <div className="dashboard-box">
              <RevenueSection />
            </div>
            <div className="dashboard-box">
              <ProfitLossSection />
            </div>
            <div className="dashboard-box">
              <ExpenseSection />
            </div>
            <div className="dashboard-box">
              <DepartmentPerformanceSection />
            </div>
            <div className="dashboard-box">
              <KPITrendsSection />
            </div>
            <div className="dashboard-box">
              <GeoDistributionSection />
            </div>
            <div className="dashboard-box full-width">
              <ProjectTimeAllocationSection />
            </div>
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