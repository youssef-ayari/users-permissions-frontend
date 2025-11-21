import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

// Attach token from localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    // Don't try to refresh if:
    // 1. This is a login or register request
    // 2. We've already retried
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.endsWith("/auth/login") &&
      !originalRequest.url?.endsWith("/auth/register")
    ) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/auth/refresh");
        const newToken = res.data.accessToken;

        localStorage.setItem("access_token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api.request(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        globalThis.location.href = "/login";
      }
    }

    // For 401 on login/register, just throw the error
    throw err;
  }
);

export { api };
