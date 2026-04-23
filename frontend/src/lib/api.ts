import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Instance axios configurée pour Django
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur : ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===========================
// Auth
// ===========================

export interface RegisterData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export const authAPI = {
  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register/", data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthTokens> => {
    const response = await api.post("/auth/login/", data);
    return response.data;
  },

  logout: async () => {
    const refresh = Cookies.get("refresh_token");
    await api.post("/auth/logout/", { refresh });
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },

  profile: async () => {
    const response = await api.get("/auth/profile/");
    return response.data;
  },
};

export default api;