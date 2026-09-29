import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ashraya_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function apiRequest(url, options = {}) {
  const response = await api({
    url,
    method: options.method || "GET",
    data: options.body
  });

  return response.data;
}

export default api;