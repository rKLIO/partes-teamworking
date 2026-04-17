export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12"
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
            Créez votre compte
          </p>
        </div>

        {/* Formulaire */}
        <div className="flex flex-col gap-5">

          {/* Prénom + Nom */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium"
                style={{ color: "var(--light-div)" }}>
                Prénom
              </label>
              <input
                type="text"
                placeholder="Jean"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "var(--dark-main)",
                  color: "var(--light-main)",
                  border: "1px solid var(--dark-sidebar)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium"
                style={{ color: "var(--light-div)" }}>
                Nom
              </label>
              <input
                type="text"
                placeholder="Dupont"
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
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Nom d'utilisateur
            </label>
            <input
              type="text"
              placeholder="jean_dupont"
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
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="vous@exemple.com"
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
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
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
            <label className="text-sm font-medium"
              style={{ color: "var(--light-div)" }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
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
            className="w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 mt-2"
            style={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark-main)",
            }}>
            Créer mon compte
          </button>

        </div>

        {/* Lien login */}
        <p className="text-center text-sm mt-6"
          style={{ color: "var(--light-div)" }}>
          Déjà un compte ?{" "}
          <a href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--green)" }}>
            Se connecter
          </a>
        </p>

      </div>
    </div>
  );
}