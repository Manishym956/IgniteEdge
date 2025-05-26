import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

// statuses prop will be used instead of this
// const statuses = ['To Do', 'In Progress', 'Done'];

// Demo: fake email notification function
const sendAssignmentEmail = (email, taskTitle) => {
  alert(`Email sent to ${email}: You have been assigned the task "${taskTitle}"`);
};

const KanbanBoard = ({ projectId, members, statuses }) => {
  // Defensive default for statuses
  const statusList = Array.isArray(statuses) && statuses.length > 0 ? statuses : ['To Do', 'In Progress', 'Done'];

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', assignee: '', status: statusList[0] });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [projectId]);

  useEffect(() => {
    setForm(f => ({ ...f, status: statusList[0] }));
    // eslint-disable-next-line
  }, [statusList.join(',')]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch (err) {}
    setLoading(false);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    await createTask({ ...form, project: projectId });
    if (form.assignee) sendAssignmentEmail(form.assignee, form.title);
    setForm({ title: '', description: '', dueDate: '', assignee: '', status: statusList[0] });
    setShowForm(false);
    fetchTasks();
  };

  const handleEdit = task => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      assignee: task.assignee || '',
      status: task.status
    });
    setShowForm(true);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const prevTask = tasks.find(t => t._id === editingTask._id);
    await updateTask(editingTask._id, { ...form, project: projectId });
    if (form.assignee && form.assignee !== prevTask.assignee) sendAssignmentEmail(form.assignee, form.title);
    setEditingTask(null);
    setForm({ title: '', description: '', dueDate: '', assignee: '', status: statusList[0] });
    setShowForm(false);
    fetchTasks();
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    await updateTask(task._id, { ...task, status: newStatus });
    fetchTasks();
  };

  // Drag-and-drop handler
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    const task = tasks.find(t => t._id === draggableId);
    if (task) {
      await updateTask(task._id, { ...task, status: destination.droppableId });
      fetchTasks();
    }
  };

  // Defensive: filter out invalid statuses
  const validStatusList = statusList.filter(s => typeof s === 'string' && s.trim() !== '');

  // Styling
  const columnStyle = (isOver) => ({
    flex: 1,
    background: isOver ? 'linear-gradient(135deg, #e0e7ff 60%, #f8fafc 100%)' : '#f8fafc',
    borderRadius: 16,
    padding: 20,
    minHeight: 420,
    boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
    transition: 'background 0.2s',
    display: 'flex', flexDirection: 'column',
  });
  const cardStyle = (isDragging) => ({
    background: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    boxShadow: isDragging ? '0 4px 16px #a5b4fc' : '0 1px 4px #e0e7ef',
    opacity: isDragging ? 0.85 : 1,
    border: isDragging ? '2px solid #6366f1' : '1px solid #e0e7ef',
    transition: 'box-shadow 0.2s, border 0.2s',
  });
  const addBtnStyle = {
    marginBottom: 12,
    background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '8px 18px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 15,
    boxShadow: '0 2px 8px rgba(99,102,241,0.10)'
  };

  return (
    <div style={{ display: 'flex', gap: 32, marginTop: 32 }}>
      {validStatusList.map(status => (
        <div
          key={status}
          style={columnStyle(false)}
        >
          <h3 style={{ textAlign: 'center', color: '#6366f1', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>{status}</h3>
          <button style={addBtnStyle} onClick={() => { setShowForm(true); setEditingTask(null); setForm(f => ({ ...f, status })); }}>+ Add Task</button>
          {showForm && form.status === status && (
            <form onSubmit={editingTask ? handleUpdate : handleCreate} style={{ background: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, boxShadow: '0 1px 4px #e0e7ef' }}>
              <input name="title" placeholder="Title" value={form.title} onChange={handleFormChange} required style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }} />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }} />
              <input name="dueDate" type="date" value={form.dueDate} onChange={handleFormChange} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }} />
              <select name="assignee" value={form.assignee} onChange={handleFormChange} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #d1d5db' }}>
                <option value="">Assign to...</option>
                {members.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" style={{ ...addBtnStyle, marginBottom: 0, padding: '8px 16px', fontSize: 14 }}>{editingTask ? 'Update' : 'Create'}</button>
                <button type="button" style={{ ...addBtnStyle, background: '#64748b', color: '#fff' }} onClick={() => { setShowForm(false); setEditingTask(null); setForm({ title: '', description: '', dueDate: '', assignee: '', status: statusList[0] }); }}>Cancel</button>
              </div>
            </form>
          )}
          {loading ? <div>Loading...</div> : (
            tasks.filter(t => t.status === status && typeof t._id === 'string' && t._id.trim() !== '').map((task, idx) => (
              <div
                key={task._id}
                style={cardStyle(false)}
              >
                <b style={{ fontSize: 17 }}>{task.title}</b>
                <div style={{ fontSize: 14, color: '#64748b', margin: '6px 0' }}>{task.description}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Due: {task.dueDate ? task.dueDate.slice(0, 10) : 'N/A'}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Assignee: {task.assignee || 'Unassigned'}</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  {statusList.filter(s => s !== status).map(s => (
                    <button key={s} style={{ ...addBtnStyle, background: '#e0e7ef', color: '#6366f1', fontSize: 13, padding: '4px 10px' }} onClick={() => handleStatusChange(task, s)}>{s}</button>
                  ))}
                  <button style={{ ...addBtnStyle, background: '#fbbf24', color: '#fff', fontSize: 13, padding: '4px 10px' }} onClick={() => handleEdit(task)}>Edit</button>
                  <button style={{ ...addBtnStyle, background: '#ef4444', color: '#fff', fontSize: 13, padding: '4px 10px' }} onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard; 