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

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 15,
            boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
            marginRight: 20
          }}
        >
          ← Back to Dashboard
        </button>
        <h2 style={{ margin: 0 }}>Projects</h2>
      </div>
      <button 
        onClick={() => setShowForm(f => !f)}
        style={{
          background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 15,
          boxShadow: '0 2px 8px rgba(99,102,241,0.10)'
        }}
      >
        {showForm ? 'Cancel' : 'Create Project'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} style={{ margin: '20px 0' }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
            style={{
              width: '100%',
              marginBottom: 8,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #d1d5db'
            }}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{
              width: '100%',
              marginBottom: 8,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #d1d5db'
            }}
          />
          <button 
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 15,
              boxShadow: '0 2px 8px rgba(99,102,241,0.10)'
            }}
          >
            Create
          </button>
        </form>
      )}
      {loading ? <div>Loading...</div> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.map(p => (
            <li key={p._id} style={{ 
              margin: '16px 0',
              background: '#fff',
              borderRadius: 10,
              padding: 16,
              boxShadow: '0 1px 4px #e0e7ef'
            }}>
              <b style={{ fontSize: 17 }}>{p.title}</b> <br />
              <span style={{ fontSize: 14, color: '#64748b' }}>{p.description}</span> <br />
              <button 
                onClick={() => navigate(`/projects/${p._id}`)}
                style={{
                  background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
                  marginTop: 8
                }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList; 