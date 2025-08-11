import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE,
});

export async function createShortUrl(originalUrl) {
  const res = await api.post('/api/shorten', { originalUrl });
  return res.data;
}

export async function adminLogin(username, password) {
  const res = await api.post('/api/admin/login', { username, password });
  return res.data;
}

export async function getAllUrls(token) {
  const res = await api.get('/api/admin/urls', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteUrl(id, token) {
  const res = await api.delete(`/api/admin/urls/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
