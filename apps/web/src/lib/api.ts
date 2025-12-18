import { useAuthStore } from '@/store/auth-store';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})
