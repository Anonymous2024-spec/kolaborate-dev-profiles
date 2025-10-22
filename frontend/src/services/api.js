import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

export const profileAPI = {
  // Get all profiles with pagination
  getAll: (page = 1, limit = 6) => api.get(`/profiles?page=${page}&limit=${limit}`),
  
  // Search profiles (no pagination for search)
  search: (term) => api.get(`/profiles/search/${term}`),
  
  // Create profile
  create: (profileData) => api.post('/profiles', profileData),
  
  // Get single profile
  getById: (id) => api.get(`/profiles/${id}`),
  
  // Update profile
  update: (id, profileData) => api.put(`/profiles/${id}`, profileData),
};
export default api;
