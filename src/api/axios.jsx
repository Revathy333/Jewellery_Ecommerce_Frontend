import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: "https://umikz-ecommerce-backend.onrender.com/api/"
});

// Request Interceptor - Attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle token refresh on 401
api.interceptors.response.use(
  (response) => response, // If success, just return response
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          // No refresh token available, redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(
        `${api.defaults.baseURL}token/refresh/`,
        { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;

        // Save new access token
        localStorage.setItem("access_token", newAccessToken);

        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear everything and redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;