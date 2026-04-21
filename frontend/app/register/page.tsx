"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/src/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    if (formData.password !== formData.password2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(formData);
      router.push("/login");
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.email) {
        setError("Cet email est déjà utilisé.");
      } else if (data?.username) {
        setError("Ce nom d'utilisateur est déjà pris.");
      } else if (data?.password) {
        setError(data.password[0]);
      } else {
        setError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12"
      style={{ backgroundColor: "var(--dark-main)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ backgroundColor: "var(--dark-sidebar)" }}
      >
        {/* Logo / Titre */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--yellow)" }}>
            PARTES
          </h1>
          <p className="text-sm" style={{ color: "var(--light-div)" }}>
            Créez votre compte
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div
            className="px-4 py-3 rounded-lg text-sm mb-5 text-center"
            style={{ backgroundColor: "var(--orange)", color: "var(--light-main)" }}
          >
            {error}
          </div>
        )}

        {/* Formulaire */}
        <div className="flex flex-col gap-5">

          {/* Prénom + Nom */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Jean"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "var(--dark-main)",
                  color: "var(--light-main)",
                  border: "1px solid var(--dark-sidebar)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Dupont"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "var(--dark-main)",
                  color: "var(--light-main)",
                  border: "1px solid var(--dark-sidebar)",
                }}
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              placeholder="jean_dupont"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="vous@exemple.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Confirmer mot de passe */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "var(--light-div)" }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="password2"
              placeholder="••••••••"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Bouton */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 mt-2 disabled:opacity-50"
            style={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark-main)",
            }}
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>

        </div>

        {/* Lien login */}
        <p className="text-center text-sm mt-6" style={{ color: "var(--light-div)" }}>
          Déjà un compte ?{" "}
          <a href="/login" className="font-semibold hover:underline" style={{ color: "var(--green)" }}>
            Se connecter
          </a>
        </p>

      </div>
    </div>
  );
}