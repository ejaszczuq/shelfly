import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";

import "./AuthLogin.scss";

const AuthLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const handleLoginWithGoogle = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithGoogle();
      navigate(PATHS.main.path);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithEmail = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithEmail("sosarat230@arinuse.com", "zaq1@WSX"); // przykladowe - tymczasowe dane uzytkownika
      navigate(PATHS.main.path);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-login">
      <h1>Auth login</h1>

      <br />
      <button onClick={handleLoginWithGoogle}>login with google</button>
      <br />
      <br />
      <button onClick={handleLoginWithEmail}>login with email/password</button>
    </div>
  );
};

export default AuthLogin;
