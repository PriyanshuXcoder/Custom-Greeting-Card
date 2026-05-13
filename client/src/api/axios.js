import axios from "axios";

// using the vite proxy, so we can just use /api
const API = axios.create({
  baseURL: "/api",
});

// attach token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("greetings_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
