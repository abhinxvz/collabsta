import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; fullName: string; role: string }) =>
    api.post('/auth/register', data),
};

// Influencers
export const influencerApi = {
  getAll: (params?: Record<string, string>) => api.get('/influencers', { params }),
  getById: (id: string) => api.get(`/influencers/${id}`),
  updateProfile: (data: Record<string, unknown>) => api.put('/influencers/profile', data),
};

// Orders
export const orderApi = {
  create: (serviceId: string, requirements: string) =>
    api.post('/orders', { serviceId, requirements }),
  getMyOrders: () => api.get('/orders/my-orders'),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
};
