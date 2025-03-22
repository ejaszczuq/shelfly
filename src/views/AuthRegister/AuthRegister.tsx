import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";
import { registerAccountSchema } from "./registerAccount.schema";

import Input from "@src/components/common/Input/Input";

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

  const formik = useFormik<RegisterAccountForm>({
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
      <h1>Rejestracja</h1>

      {error && <p className="error-global">{error}</p>}

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
            label="Hasło"
            placeholder="Wprowadź hasło"
            component={Input}
            prefixIcon="PasswordTwoTone"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
          </button>
        </form>
      </FormikProvider>

      <p>Masz już konto?</p>
      <button onClick={goToAuthLogin}>Przejdź do logowania</button>
    </div>
  );
};

export default AuthRegister;
