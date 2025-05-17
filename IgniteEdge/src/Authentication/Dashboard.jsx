import { Home, Users, Clipboard, Settings, LogOut, TrendingUp } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
<div className="sidebar">
        <div className="section">
          <div className="avatar">J</div>
          <span className="name">John Doe</span>
        </div>

        
        <nav className="nav">
          <NavItem icon={<Home size={20} />} text="Home" active />
          <NavItem icon={<Users size={20} />} text="Employee" />
          <NavItem icon={<Clipboard size={20} />} text="Task Management" />
          <NavItem icon={<Settings size={20} />} text="Settings" />
        </nav>

        
        <div className="logout">
          <button className="logout-button">
            <LogOut size={20} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
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

function NavItem({ icon, text, active }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`}>
      <div className="nav-icon">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
