import { Home, Users, Clipboard, Settings, LogOut } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

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

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="section">
          <div className="avatar">J</div>
          <span className="name">John Doe</span>
        </div>

        <nav className="nav">
          <NavItem icon={<Home size={20} />} text="Home" active />
          <NavItem icon={<Users size={20} />} text="Employee" onClick={() => navigate('/EmployeeList')}/>
          <NavItem icon={<Clipboard size={20} />} text="Task Management" />
          <NavItem icon={<Settings size={20} />} text="Settings" />
          <NavItem icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} />
        </nav>
      </div>

      <div className="main-content">
        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h2 className="box-header">Card 1</h2>
            <p>This is the first card content.</p>
          </div>

          <div className="dashboard-box">
            <h2 className="box-header">Card 2</h2>
            <p>This is the second card content.</p>
          </div>

          <div className="dashboard-box">
            <h2 className="box-header">Card 3</h2>
            <p>This is the third card content.</p>
          </div>

          <div className="dashboard-box">
            <h2 className="box-header">Card 4</h2>
            <p>This is the fourth card content.</p>
          </div>

          <div className="dashboard-box">
            <h2 className="box-header">Card 5</h2>
            <p>This is the fifth card content.</p>
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
