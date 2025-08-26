// client/src/utils/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || ""; // if empty -> same-origin

const api = axios.create({
  baseURL: API_BASE,
  // If you use cookie-based auth, keep withCredentials true; otherwise false
  withCredentials: false
});

export default api;