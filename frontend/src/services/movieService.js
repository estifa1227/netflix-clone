import apiClient from "./axios";

const MOVIE_ENDPOINTS = {
  ALL: "/movies",
  BY_ID: (id) => `/movies/${id}`,
  TRENDING: "/movies/trending",
  POPULAR: "/movies/popular",
  TOP_RATED: "/movies/top-rated",
  BY_CATEGORY: (category) => `/movies/category/${category}`,
  FEATURED: "/movies/featured",
  SEARCH: "/movies/search",
  SIMILAR: (id) => `/movies/${id}/similar`,
};

export const movieService = {
  getAll: async (params = {}) => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.ALL, { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.BY_ID(id));
    return data;
  },

  // TMDB
  getTrending: async () => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.TRENDING);
    return data;
  },
  getByGenre: async (genreId) => {
  const { data } = await apiClient.get(`/movies/genre/${genreId}`);
  return data;
},

  getPopular: async () => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.POPULAR);
    return data;
  },

  getTopRated: async () => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.TOP_RATED);
    return data;
  },

  // MongoDB category (if you still use it)
  getByCategory: async (category) => {
    const { data } = await apiClient.get(
      MOVIE_ENDPOINTS.BY_CATEGORY(category)
    );
    return data;
  },

  search: async (query) => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.SEARCH, {
      params: { q: query },
    });
    return data;
  },

  getFeatured: async () => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.FEATURED);
    return data;
  },

  getSimilar: async (id) => {
    const { data } = await apiClient.get(MOVIE_ENDPOINTS.SIMILAR(id));
    return data;
  },
};