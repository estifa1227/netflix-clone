import apiClient from './axios';

export const adminService = {
  getMovies: async (params = {}) => {
    const { data } = await apiClient.get('/movies', { params });
    return data;
  },

  getMovieById: async (id) => {
    const { data } = await apiClient.get(`/movies/${id}`);
    return data;
  },

  createMovie: async (formData) => {
    const { data } = await apiClient.post('/movies', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  updateMovie: async (id, formData) => {
    const { data } = await apiClient.put(`/movies/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  deleteMovie: async (id) => {
    const { data } = await apiClient.delete(`/movies/${id}`);
    return data;
  },

  getUsers: async () => {
    const { data } = await apiClient.get('/users');
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await apiClient.delete(`/users/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get('/movies/categories');
    return data;
  },
};
