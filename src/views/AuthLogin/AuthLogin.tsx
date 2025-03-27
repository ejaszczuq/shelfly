import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik, Field, FormikProvider } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";
import { loginSchema } from "./login.schema";

import BaseLayout from "@src/components/layouts/BaseLayout/BaseLayout";
import Input from "@src/components/common/Input/Input";
import DynamicIcon from "@src/components/common/DynamicIcon";

import "./AuthLogin.scss";
import Button from "@src/components/common/Button/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

const AuthLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const validationSchema = loginSchema();

  const handleLoginWithEmail = async ({ email, password }: LoginFormValues) => {
    if (isLoading) return;

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

  const handleGoogleLogin = async () => {
    if (isLoading) return;

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

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLoginWithEmail
  });

  return (
    <div className="auth-login">
      <h1>{t("auth:login.title")}</h1>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Field
            name="email"
            type="email"
            label={t("auth:login.form.inputs.email.label")}
            placeholder={t("auth:login.form.inputs.email.placeholder")}
            component={Input}
            prefixIcon="AlternateEmailTwoTone"
          />

          <Field
            name="password"
            type="password"
            label={t("auth:login.form.inputs.password.label")}
            placeholder={t("auth:login.form.inputs.password.placeholder")}
            component={Input}
            prefixIcon="PasswordTwoTone"
          />

          {error && <p className="error">{error}</p>}

          <Button type="submit" disabled={isLoading} variant={"primary"}>
            {isLoading ? <span className="loading-dots">{t("auth:login.logingIn")}</span> : t("auth:login.login")}
          </Button>
        </form>
      </FormikProvider>

      {/* Przyciski poza formularzem */}
      <Button variant="secondary" className="google" onClick={handleGoogleLogin} disabled={isLoading}>
        <DynamicIcon iconName="Google" />
        {isLoading ? <span className="loading-dots">{t("auth:login.logingIn")}</span> : t("auth:login.loginWithGoogle")}
      </Button>

      <p onClick={() => navigate(PATHS.authRegister.path)}>{t("auth:login.dontHaveAccount")}</p>
    </div>
  );
};

export default (
  <BaseLayout>
    <AuthLogin />
  </BaseLayout>
);
