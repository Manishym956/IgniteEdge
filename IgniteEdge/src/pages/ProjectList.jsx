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
      <h2>Projects</h2>
      <button onClick={() => setShowForm(f => !f)}>{showForm ? 'Cancel' : 'Create Project'}</button>
      {showForm && (
        <form onSubmit={handleCreate} style={{ margin: '20px 0' }}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit">Create</button>
        </form>
      )}
      {loading ? <div>Loading...</div> : (
        <ul>
          {projects.map(p => (
            <li key={p._id} style={{ margin: '16px 0' }}>
              <b>{p.title}</b> <br />
              <span>{p.description}</span> <br />
              <button onClick={() => navigate(`/projects/${p._id}`)}>View</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList; 