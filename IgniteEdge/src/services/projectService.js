const API_URL = 'http://localhost:1600/api/projects';

export const getProjects = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProject = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getProjectById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const inviteMember = async (id, email) => {
  const res = await fetch(`${API_URL}/${id}/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
}; 