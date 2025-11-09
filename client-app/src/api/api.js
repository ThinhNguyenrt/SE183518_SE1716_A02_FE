import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7176/api', // Proxied
});

// Auto-attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
// =====================
// ✅ CATEGORY API
// =====================

// Get all categories
export const getCategories = async () => {
  const response = await api.get('/category');
  return response.data;
};

export const createCategory = async (data) => {
  const res = await api.post("/category", data);
  return res.data;
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/category/${id}`);
  return response.data;
};

// Update a category
export const updateCategory = async (id, data) => {
const payload = { ...data, categoryId: id }; // ✅ include id in body
  const response = await api.put(`/category`, payload); // ✅ backend expects /category (not /category/{id})
  return response.data;
};

// Add more: categories, news, reports, etc.
export default api;