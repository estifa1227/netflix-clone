import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('streamflix_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        localStorage.removeItem('streamflix_user');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only logout if the 401 comes from authentication endpoints
    if (
      error.response?.status === 401 &&
      error.config.url.includes("/auth")
    ) {
      localStorage.removeItem("streamflix_user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;