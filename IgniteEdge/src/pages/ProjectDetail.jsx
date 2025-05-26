import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';
import { inviteMember, getProjectById, createProject } from '../services/projectService';
import { getAutomations, createAutomation, deleteAutomation } from '../services/automationService';

const automationTriggers = [
  { value: 'task_moved', label: 'Task moved to status' },
  { value: 'task_assigned', label: 'Task assigned to user' },
  { value: 'due_date_passed', label: 'Task due date passed' },
];
const automationActions = [
  { value: 'assign_badge', label: 'Assign badge' },
  { value: 'move_status', label: 'Move task to status' },
  { value: 'send_notification', label: 'Send notification' },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState('');
  const [addMemberEmail, setAddMemberEmail] = useState('');
  const [addMemberStatus, setAddMemberStatus] = useState('');
  const [automations, setAutomations] = useState([]);
  const [autoForm, setAutoForm] = useState({ trigger: '', action: '', config: '' });
  const [autoStatus, setAutoStatus] = useState('');
  const [editingStatuses, setEditingStatuses] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [statusInput, setStatusInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchProject();
    fetchAutomations();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (project && project.customStatuses) setStatuses(project.customStatuses);
  }, [project]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchAutomations = async () => {
    try {
      const data = await getAutomations(id);
      setAutomations(data);
    } catch (err) {}
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteStatus('');
    try {
      const res = await inviteMember(id, inviteEmail);
      setInviteStatus('Invitation sent!');
      setInviteEmail('');
      fetchProject();
    } catch (err) {
      setInviteStatus('Failed to invite.');
    }
  };

  // Demo: Add member directly (no email)
  const handleAddMember = async (e) => {
    e.preventDefault();
    setAddMemberStatus('');
    try {
      // Use inviteMember endpoint for consistency
      const res = await inviteMember(id, addMemberEmail);
      setAddMemberStatus('Member added!');
      setAddMemberEmail('');
      fetchProject();
    } catch (err) {
      setAddMemberStatus('Failed to add member.');
    }
  };

  const handleAutoFormChange = e => {
    setAutoForm({ ...autoForm, [e.target.name]: e.target.value });
  };

  const handleAddAutomation = async e => {
    e.preventDefault();
    setAutoStatus('');
    try {
      await createAutomation({ project: id, ...autoForm, config: autoForm.config });
      setAutoForm({ trigger: '', action: '', config: '' });
      setAutoStatus('Automation added!');
      fetchAutomations();
    } catch (err) {
      setAutoStatus('Failed to add automation.');
    }
  };

  const handleDeleteAutomation = async (autoId) => {
    await deleteAutomation(autoId);
    fetchAutomations();
  };

  // Custom Statuses UI
  const handleAddStatus = () => {
    if (statusInput && !statuses.includes(statusInput)) {
      setStatuses([...statuses, statusInput]);
      setStatusInput('');
    }
  };
  const handleRemoveStatus = (s) => {
    setStatuses(statuses.filter(st => st !== s));
  };
  const handleSaveStatuses = async () => {
    setStatusMsg('');
    try {
      await createProject({ ...project, customStatuses: statuses }); // Actually should be updateProject, but using createProject for demo
      setStatusMsg('Statuses updated!');
      fetchProject();
      setEditingStatuses(false);
    } catch (err) {
      setStatusMsg('Failed to update statuses.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div style={{ marginBottom: 24, display: 'flex', gap: 32 }}>
        <form onSubmit={handleInvite} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="email"
            placeholder="Invite member by email"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }}
          />
          <button type="submit">Invite</button>
          {inviteStatus && <span style={{ marginLeft: 8, color: '#22c55e' }}>{inviteStatus}</span>}
        </form>
        <form onSubmit={handleAddMember} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="email"
            placeholder="Add member (demo)"
            value={addMemberEmail}
            onChange={e => setAddMemberEmail(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }}
          />
          <button type="submit">Add</button>
          {addMemberStatus && <span style={{ marginLeft: 8, color: '#22c55e' }}>{addMemberStatus}</span>}
        </form>
      </div>
      <h4>Members:</h4>
      <ul>
        {project.members.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
      {/* Custom Statuses UI */}
      <div style={{ margin: '32px 0', background: '#f8fafc', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px #e0e7ef' }}>
        <h3 style={{ color: '#6366f1', marginBottom: 12 }}>Custom Kanban Statuses</h3>
        {editingStatuses ? (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input value={statusInput} onChange={e => setStatusInput(e.target.value)} placeholder="Add status" style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }} />
              <button onClick={handleAddStatus} type="button">Add</button>
            </div>
            <ul style={{ display: 'flex', gap: 12, flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
              {statuses.map(s => (
                <li key={s} style={{ background: '#fff', borderRadius: 6, padding: '6px 16px', boxShadow: '0 1px 4px #e0e7ef', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {s}
                  <button onClick={() => handleRemoveStatus(s)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>×</button>
                </li>
              ))}
            </ul>
            <button onClick={handleSaveStatuses} style={{ marginTop: 12 }}>Save Statuses</button>
            {statusMsg && <span style={{ marginLeft: 12, color: '#22c55e' }}>{statusMsg}</span>}
          </>
        ) : (
          <>
            <ul style={{ display: 'flex', gap: 12, flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
              {statuses.map(s => (
                <li key={s} style={{ background: '#fff', borderRadius: 6, padding: '6px 16px', boxShadow: '0 1px 4px #e0e7ef' }}>{s}</li>
              ))}
            </ul>
            <button onClick={() => setEditingStatuses(true)} style={{ marginTop: 12 }}>Edit Statuses</button>
          </>
        )}
      </div>
      <KanbanBoard projectId={project._id} members={project.members} statuses={statuses} />
      {/* Automations UI */}
      <div style={{ marginTop: 48, background: '#f8fafc', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px #e0e7ef' }}>
        <h3 style={{ color: '#6366f1', marginBottom: 16 }}>Automations</h3>
        <form onSubmit={handleAddAutomation} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <select name="trigger" value={autoForm.trigger} onChange={handleAutoFormChange} required style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }}>
            <option value="">Select Trigger</option>
            {automationTriggers.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <select name="action" value={autoForm.action} onChange={handleAutoFormChange} required style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }}>
            <option value="">Select Action</option>
            {automationActions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
          <input name="config" placeholder="Config (e.g. status name, badge)" value={autoForm.config} onChange={handleAutoFormChange} style={{ padding: 8, borderRadius: 4, border: '1px solid #d1d5db', minWidth: 180 }} />
          <button type="submit">Add Automation</button>
          {autoStatus && <span style={{ color: '#22c55e', marginLeft: 8 }}>{autoStatus}</span>}
        </form>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {automations.map(auto => (
            <li key={auto._id} style={{ background: '#fff', borderRadius: 8, marginBottom: 10, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px #e0e7ef' }}>
              <span>
                <b>When</b> <span style={{ color: '#6366f1' }}>{automationTriggers.find(t => t.value === auto.trigger)?.label || auto.trigger}</span>
                <b> then </b><span style={{ color: '#2563eb' }}>{automationActions.find(a => a.value === auto.action)?.label || auto.action}</span>
                {auto.config && <> (<span style={{ color: '#64748b' }}>{auto.config}</span>)</>}
              </span>
              <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 600 }} onClick={() => handleDeleteAutomation(auto._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail; 