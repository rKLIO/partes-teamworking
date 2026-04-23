"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--dark-main)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ backgroundColor: "var(--dark-sidebar)" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--yellow)" }}>
            PARTES
          </h1>
          <p className="text-sm" style={{ color: "var(--light-div)" }}>
            Connectez-vous à votre espace
          </p>
        </div>

        {error && (
          <div
            className="px-4 py-3 rounded-lg text-sm mb-5 text-center"
            style={{ backgroundColor: "var(--orange)", color: "var(--light-main)" }}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 mt-2 disabled:opacity-50"
            style={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark-main)",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--light-div)" }}>
          Pas encore de compte ?{" "}
          <a href="/register" className="font-semibold hover:underline" style={{ color: "var(--green)" }}>
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}