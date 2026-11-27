const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = {
  getChildren: () =>
    fetch(`${BASE}/api/children`).then(r => r.json()),

  addChild: (data) =>
    fetch(`${BASE}/api/children`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  updateChild: (id, data) =>
    fetch(`${BASE}/api/children/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  deleteChild: (id) =>
    fetch(`${BASE}/api/children/${id}`, { method: 'DELETE' })
      .then(r => r.json()),

  uploadImage: async (file) => {
    const fd = new FormData();
    fd.append('image', file);
    const res = await fetch(`${BASE}/api/upload`, { method: 'POST', body: fd });
    return res.json();
  },

  reorder: (order) =>
    fetch(`${BASE}/api/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order })
    }).then(r => r.json())
};

export const BASE_URL = BASE;