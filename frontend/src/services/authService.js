import apiClient from './axios';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/profile',
};

export const authService = {
  login: async (credentials) => {
    const { data } = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return data;
  },

  register: async (userData) => {
    const { data } = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
    return data;
  },

  getProfile: async () => {
    const { data } = await apiClient.get(AUTH_ENDPOINTS.PROFILE);
    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await apiClient.put(AUTH_ENDPOINTS.PROFILE, profileData);
    return data;
  },
};
