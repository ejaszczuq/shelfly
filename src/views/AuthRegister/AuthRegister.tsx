import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";

import "./AuthRegister.scss";

const AuthRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();

  const handleRegisterWithEmail = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await registerWithEmail("sosarat230@arinuse.com", "zaq1@WSX"); // przykladowe - tymczasowe dane uzytkownika
      navigate(PATHS.main.path);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-register">
      <h1>Auth register</h1>

      <br />
      <br />
      <br />
      <button onClick={handleRegisterWithEmail}>Register account</button>
    </div>
  );
};

export default AuthRegister;
