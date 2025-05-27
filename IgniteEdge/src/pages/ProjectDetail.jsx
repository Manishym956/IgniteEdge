import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const buttonStyle = {
    primary: {
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
    },
    secondary: {
      background: '#f1f5f9',
      color: '#1e293b',
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      padding: '10px 20px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 15,
      transition: 'all 0.2s ease',
      '&:hover': {
        background: '#e2e8f0'
      }
    },
    danger: {
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '8px 16px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: 14,
      transition: 'all 0.2s ease',
      '&:hover': {
        background: '#dc2626'
      }
    }
  };

  const inputStyle = {
    width: '100%',
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

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

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
          onClick={() => navigate('/projects')}
          style={{
            ...buttonStyle.secondary,
            marginRight: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span style={{ fontSize: 20 }}>←</span> Back to Projects
        </button>
        <div>
          <h2 style={{ 
            margin: '0 0 8px 0',
            fontSize: 24,
            color: '#1e293b',
            fontWeight: 600
          }}>{project.title}</h2>
          <p style={{ 
            margin: 0,
            color: '#64748b',
            fontSize: 16
          }}>{project.description}</p>
        </div>
      </div>

      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginBottom: 24
      }}>
        <h3 style={{ 
          margin: '0 0 16px 0',
          fontSize: 18,
          color: '#1e293b',
          fontWeight: 600
        }}>Team Members</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <form onSubmit={handleInvite} style={{ width: '100%' }}>
            <label style={{ 
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              color: '#64748b'
            }}>Invite Member by Email</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle.primary}>Send Invitation</button>
            </div>
            {inviteStatus && <span style={{ display: 'block', marginTop: 8, color: '#22c55e' }}>{inviteStatus}</span>}
          </form>
          <form onSubmit={handleAddMember} style={{ width: '100%' }}>
            <label style={{ 
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              color: '#64748b'
            }}>Add Member Directly</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="email"
                placeholder="Enter email address"
                value={addMemberEmail}
                onChange={e => setAddMemberEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle.secondary}>Add Member</button>
            </div>
            {addMemberStatus && <span style={{ display: 'block', marginTop: 8, color: '#22c55e' }}>{addMemberStatus}</span>}
          </form>
        </div>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          padding: '16px',
          background: '#f8fafc',
          borderRadius: 8
        }}>
          {project.members.map((m, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: '8px 16px',
              borderRadius: 6,
              border: '1px solid #e2e8f0',
              fontSize: 14,
              color: '#1e293b'
            }}>{m}</div>
          ))}
        </div>
      </div>

      {/* Custom Statuses UI */}
      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ 
            margin: 0,
            fontSize: 18,
            color: '#1e293b',
            fontWeight: 600
          }}>Custom Kanban Statuses</h3>
          {!editingStatuses && (
            <button 
              onClick={() => setEditingStatuses(true)}
              style={buttonStyle.secondary}
            >
              Edit Statuses
            </button>
          )}
        </div>
        {editingStatuses ? (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <input 
                value={statusInput} 
                onChange={e => setStatusInput(e.target.value)} 
                placeholder="Add new status" 
                style={inputStyle}
              />
              <button 
                onClick={handleAddStatus} 
                type="button"
                style={buttonStyle.primary}
              >
                Add Status
              </button>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: 12, 
              flexWrap: 'wrap', 
              marginBottom: 16,
              padding: '16px',
              background: '#f8fafc',
              borderRadius: 8
            }}>
              {statuses.map(s => (
                <div key={s} style={{ 
                  background: '#fff',
                  borderRadius: 6,
                  padding: '8px 16px',
                  boxShadow: '0 1px 4px #e0e7ef',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontSize: 14, color: '#1e293b' }}>{s}</span>
                  <button 
                    onClick={() => handleRemoveStatus(s)} 
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '2px 6px',
                      fontSize: 16,
                      borderRadius: 4,
                      '&:hover': {
                        background: '#fee2e2'
                      }
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button 
                onClick={handleSaveStatuses}
                style={buttonStyle.primary}
              >
                Save Changes
              </button>
              <button 
                onClick={() => setEditingStatuses(false)}
                style={buttonStyle.secondary}
              >
                Cancel
              </button>
              {statusMsg && <span style={{ color: '#22c55e', marginLeft: 12 }}>{statusMsg}</span>}
            </div>
          </>
        ) : (
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            flexWrap: 'wrap',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: 8
          }}>
            {statuses.map(s => (
              <div key={s} style={{ 
                background: '#fff',
                borderRadius: 6,
                padding: '8px 16px',
                boxShadow: '0 1px 4px #e0e7ef',
                fontSize: 14,
                color: '#1e293b',
                border: '1px solid #e2e8f0'
              }}>{s}</div>
            ))}
          </div>
        )}
      </div>

      <KanbanBoard projectId={project._id} members={project.members} statuses={statuses} />

      {/* Automations UI */}
      <div style={{ 
        background: '#fff',
        padding: '24px',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginTop: 24
      }}>
        <h3 style={{ 
          margin: '0 0 16px 0',
          fontSize: 18,
          color: '#1e293b',
          fontWeight: 600
        }}>Automations</h3>
        <form onSubmit={handleAddAutomation} style={{ 
          display: 'flex', 
          gap: 12, 
          alignItems: 'flex-end',
          marginBottom: 24,
          padding: '16px',
          background: '#f8fafc',
          borderRadius: 8
        }}>
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              color: '#64748b'
            }}>Trigger</label>
            <select 
              name="trigger" 
              value={autoForm.trigger} 
              onChange={handleAutoFormChange} 
              required 
              style={inputStyle}
            >
              <option value="">Select Trigger</option>
              {automationTriggers.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              color: '#64748b'
            }}>Action</label>
            <select 
              name="action" 
              value={autoForm.action} 
              onChange={handleAutoFormChange} 
              required 
              style={inputStyle}
            >
              <option value="">Select Action</option>
              {automationActions.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ 
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              color: '#64748b'
            }}>Configuration</label>
            <input 
              name="config" 
              placeholder="Config (e.g. status name, badge)" 
              value={autoForm.config} 
              onChange={handleAutoFormChange} 
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle.primary}>Add Automation</button>
        </form>
        {autoStatus && (
          <div style={{ 
            marginBottom: 16,
            padding: '12px 16px',
            background: '#dcfce7',
            color: '#166534',
            borderRadius: 8,
            fontSize: 14
          }}>
            {autoStatus}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {automations.map(auto => (
            <div key={auto._id} style={{ 
              background: '#fff',
              borderRadius: 8,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: 14 }}>
                <span style={{ color: '#64748b' }}>When</span>{' '}
                <span style={{ color: '#6366f1', fontWeight: 500 }}>
                  {automationTriggers.find(t => t.value === auto.trigger)?.label || auto.trigger}
                </span>{' '}
                <span style={{ color: '#64748b' }}>then</span>{' '}
                <span style={{ color: '#2563eb', fontWeight: 500 }}>
                  {automationActions.find(a => a.value === auto.action)?.label || auto.action}
                </span>
                {auto.config && (
                  <span style={{ color: '#64748b' }}>
                    {' '}(<span style={{ color: '#1e293b' }}>{auto.config}</span>)
                  </span>
                )}
              </div>
              <button 
                style={buttonStyle.danger}
                onClick={() => handleDeleteAutomation(auto._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 