import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    if (err.response?.status === 401) {
      try {
        const res = await api.post("/auth/refresh");
        const newToken = res.data.accessToken;

        localStorage.setItem("access_token", newToken);

        err.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(err.config);
      } catch {
        localStorage.removeItem("access_token");
        globalThis.location.href = "/login";
      }
    }
    throw err;
  }
);

export { api };
