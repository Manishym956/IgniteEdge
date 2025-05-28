import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:1600/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:1600/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, members: [], owner: 'demo@user.com' }) // TODO: use real user
      });
      setForm({ title: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      // handle error
    }
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
    boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(99,102,241,0.20)'
    }
  };

  const inputStyle = {
    width: '100%',
    marginBottom: 12,
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    fontSize: 15,
    transition: 'all 0.2s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#6366f1',
      boxShadow: '0 0 0 3px rgba(99,102,241,0.10)'
    }
  };

  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: 32,
        background: '#fff',
        padding: '24px',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            ...buttonStyle,
            marginRight: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span style={{ fontSize: 20 }}>←</span> Back to Dashboard
        </button>
        <h2 style={{ 
          margin: 0,
          fontSize: 24,
          color: '#1e293b',
          fontWeight: 600
        }}>Projects</h2>
      </div>

      <div style={{
        background: '#fff',
        padding: '24px',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginBottom: 24
      }}>
        <button 
          onClick={() => setShowForm(f => !f)}
          style={{
            ...buttonStyle,
            background: showForm ? '#64748b' : 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)'
          }}
        >
          {showForm ? 'Cancel' : '+ Create Project'}
        </button>

        {showForm && (
          <form onSubmit={handleCreate} style={{ 
            marginTop: 24,
            padding: '24px',
            background: '#f8fafc',
            borderRadius: 8
          }}>
            <input
              placeholder="Project Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              placeholder="Project Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={inputStyle}
            />
            <button 
              type="submit"
              style={buttonStyle}
            >
              Create Project
            </button>
          </form>
        )}
      </div>

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#64748b',
          fontSize: 16
        }}>
          Loading projects...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24
        }}>
          {projects.map(p => (
            <div key={p._id} style={{ 
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              border: '1px solid #e2e8f0',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }
            }}>
              <h3 style={{ 
                fontSize: 18,
                color: '#1e293b',
                margin: '0 0 12px 0',
                fontWeight: 600
              }}>{p.title}</h3>
              <p style={{ 
                fontSize: 14,
                color: '#64748b',
                margin: '0 0 20px 0',
                lineHeight: 1.5
              }}>{p.description}</p>
              <button 
                onClick={() => navigate(`/projects/${p._id}`)}
                style={{
                  ...buttonStyle,
                  width: '100%'
                }}
              >
                View Project
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList; 