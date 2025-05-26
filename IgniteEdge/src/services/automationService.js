const API_URL = 'http://localhost:1600/api/automations';

export const getAutomations = async (projectId) => {
  const res = await fetch(`${API_URL}?project=${projectId}`);
  return res.json();
};

export const createAutomation = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateAutomation = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteAutomation = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.json();
}; 