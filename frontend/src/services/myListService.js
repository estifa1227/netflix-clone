import apiClient from './axios';

const MYLIST_ENDPOINTS = {
  ALL: '/auth/mylist',
  ADD: (id) => `/auth/mylist/${id}`,
  REMOVE: (id) => `/auth/mylist/${id}`,
};

export const myListService = {
  getAll: async () => {
    const { data } = await apiClient.get(MYLIST_ENDPOINTS.ALL);
    return data;
  },

  add: async (movieId) => {
    const { data } = await apiClient.post(MYLIST_ENDPOINTS.ADD(movieId));
    return data;
  },

  remove: async (movieId) => {
    const { data } = await apiClient.delete(MYLIST_ENDPOINTS.REMOVE(movieId));
    return data;
  },
};
