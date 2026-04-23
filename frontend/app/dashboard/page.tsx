"use client";

import { useAuth } from "@/src/context/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen p-8"
        style={{ backgroundColor: "var(--dark-main)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "var(--yellow)" }}>
            PARTES
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--dark-sidebar)",
              color: "var(--light-div)",
            }}
          >
            Déconnexion
          </button>
        </div>

        {/* Contenu */}
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: "var(--dark-sidebar)" }}
        >
          <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--light-main)" }}>
            Bonjour, {user?.first_name} {user?.last_name} 👋
          </h2>
          <p className="text-sm" style={{ color: "var(--light-div)" }}>
            {user?.email}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}