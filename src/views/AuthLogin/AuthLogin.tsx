import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";
import { loginSchema } from "./login.schema";

import Input from "@src/components/common/Input/Input";
import DynamicIcon from "@src/components/common/DynamicIcon";

import "./AuthLogin.scss";

interface LoginForm {
  email: string;
  password: string;
}

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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLoginWithEmail
  });

  const handleGoogleLogin = async () => {
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

  return (
    <div className="auth-login">
      <h1>Login</h1>

      {error && <p className="error">{error}</p>}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="Wprowadź email"
            component={Input}
            prefixIcon="AlternateEmailTwoTone"
          />

          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="Wprowadź hasło"
            component={Input}
            prefixIcon="PasswordTwoTone"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </FormikProvider>

      {/* Przyciski poza formularzem */}
      <button className="google-button" onClick={handleGoogleLogin} disabled={isLoading}>
        <DynamicIcon iconName="Google" />
        {isLoading ? "Logging in..." : "Login with Google"}
      </button>

      <p onClick={() => navigate(PATHS.authRegister.path)}>Don't have an account?</p>
    </div>
  );
};

export default AuthLogin;
