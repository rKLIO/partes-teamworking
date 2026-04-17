export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--dark-main)" }}>

      <div className="w-full max-w-md p-8 rounded-2xl"
        style={{ backgroundColor: "var(--dark-sidebar)" }}>

        {/* Logo / Titre */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2"
            style={{ color: "var(--yellow)" }}>
            PARTES
          </h1>
          <p className="text-sm" style={{ color: "var(--light-div)" }}>
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Formulaire */}
        <div className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="vous@exemple.com"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--dark-main)",
                color: "var(--light-main)",
                border: "1px solid var(--dark-sidebar)",
              }}
            />
          </div>

          {/* Bouton */}
          <button
            className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 mt-2"
            style={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark-main)",
            }}>
            Se connecter
          </button>

        </div>

        {/* Lien register */}
        <p className="text-center text-sm mt-6"
          style={{ color: "var(--light-div)" }}>
          Pas encore de compte ?{" "}
          <a href="/register"
            className="font-semibold hover:underline"
            style={{ color: "var(--green)" }}>
            Créer un compte
          </a>
        </p>

      </div>
    </div>
  );
}