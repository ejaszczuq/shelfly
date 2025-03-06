import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";

import { registerAccountSchema } from "./registerAccount.schema";
import "./AuthRegister.scss";

interface RegisterAccountForm {
  email: string;
  password: string;
}

const AuthRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();

  const validationSchema = registerAccountSchema();

  const handleRegisterWithEmail = async ({ email, password }: RegisterAccountForm) => {
    setError(null);
    setIsLoading(true);

    try {
      await registerWithEmail(email, password);
      navigate(PATHS.main.path);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik<RegisterAccountForm>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleRegisterWithEmail
  });

  const goToAuthLogin = () => navigate(PATHS.authLogin.path);

  return (
    <div className="auth-register">
      <h1>Register</h1>

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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>Already have an account?</p>
      <button onClick={goToAuthLogin}>Go to Login</button>
    </div>
  );
};

export default AuthRegister;
