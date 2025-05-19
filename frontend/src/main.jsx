import React, { useContext } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/global.css";
import { AuthContext, AuthProvider } from "./provider/auth_provider.jsx";
import { RecruiterProvider } from "./provider/recruiter_provider.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppWithProviders = () => {
  const { isAdmin, loading } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  return isAdmin ? (
    <RecruiterProvider>
      <App />
    </RecruiterProvider>
  ) : (
    <App />
  );
};

const Root = () => (
  <StrictMode>
    <AuthProvider>
      <AppWithProviders />
    </AuthProvider>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(<Root />);
