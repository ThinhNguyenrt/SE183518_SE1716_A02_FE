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
  const response = await api.get('/auth/profile');
  return response.data.data;
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
// =====================
// ✅ NEWS API
// =====================

// Get all news articles
export const getNewsArticles = async () => {
  const response = await api.get("/newsarticle");
  return response.data.data;
};

// Create a new article
export const createNewsArticle = async (data) => {
  const response = await api.post("/newsarticle", data);
  return response.data;
};

// Update existing article
export const updateNewsArticle = async (id, data) => {
  const payload = { ...data, newsArticleId: id }; // include ID in body if backend expects it
  const response = await api.put("/newsarticle", payload); // PUT to /newsarticle (not /newsarticle/{id})
  return response.data;
};

// Delete an article
export const deleteNewsArticle = async (id) => {
  const response = await api.delete(`/newsarticle/${id}`);
  return response.data;
};

// =====================
// Accounts
// =====================
export const getAccounts = async () => {
  const response = await api.get('/account');
  return response.data;
};
// Create account
export const createAccount = async (data) => {
  const response = await api.post("/account", data);
  return response.data;
};

// Update account
export const updateAccount = async (id, data) => {
  const payload = { ...data, accountId: id };
  const response = await api.put(`/account/${id}`, payload);
  return response.data;
};

// Delete account
export const deleteAccountById = async (id) => {
  const response = await api.delete(`/account/${id}`);
  return response.data;
};

// Add more: categories, news, reports, etc.
export default api;