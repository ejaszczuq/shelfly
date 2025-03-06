import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";

import { loginSchema } from "./login.schema";
import "./AuthLogin.scss";

interface LoginForm {
  email: string;
  password: string;
}

const AuthLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const validationSchema = loginSchema();

  const handleLoginWithEmail = async ({ email, password }: LoginForm) => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate(PATHS.main.path);
    } catch (err: any) {
      // console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithGoogle();
      navigate(PATHS.main.path);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigate(PATHS.authRegister.path);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLoginWithEmail
  });

  return (
    <div className="auth-login">
      <h1>Login</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button onClick={handleLoginWithGoogle} disabled={isLoading}>
        Login with Google
      </button>

      <p>Don't have an account?</p>
      <button onClick={handleGoToRegister}>Go to Register</button>
    </div>
  );
};

export default AuthLogin;
