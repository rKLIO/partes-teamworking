import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur requête — ajoute le token JWT automatiquement
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur réponse — gère les tokens expirés automatiquement
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si 401 et pas déjà en train de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          // Tente de rafraîchir le token
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          Cookies.set("access_token", newAccessToken, { expires: 1 / 24 });

          // Relance la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch {
          // Refresh token expiré → déconnexion forcée
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/login";
        }
      } else {
        // Pas de refresh token → déconnexion
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

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

  updateProfile: async (uuid: string, data: Partial<RegisterData>) => {
    const response = await api.patch(`/users/${uuid}/update/`, data);
    return response.data;
  },
};

export default api;