"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authAPI } from "@/src/lib/api";

// Types
interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  profile_picture: string | null;
  creation_date: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Provider — enveloppe toute l'app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Au chargement, vérifie si un token existe et récupère le profil
  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const profile = await authAPI.profile();
          setUser(profile);
        } catch {
          // Token expiré ou invalide → on nettoie
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const tokens = await authAPI.login({ email, password });
    Cookies.set("access_token", tokens.access, { expires: 1 / 24 });
    Cookies.set("refresh_token", tokens.refresh, { expires: 7 });
    const profile = await authAPI.profile();
    setUser(profile);
    router.push("/dashboard");
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook useAuth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}