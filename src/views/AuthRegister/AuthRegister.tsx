import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik, Field, FormikProvider } from "formik";

import { PATHS } from "@src/router/paths";
import { useAuth } from "@src/contexts/Auth.context";
import { registerAccountSchema } from "./registerAccount.schema";

import BaseLayout from "@src/components/layouts/BaseLayout/BaseLayout";
import Input from "@src/components/common/Input/Input";

import "./AuthRegister.scss";
import Button from "@src/components/common/Button/Button";

interface RegisterAccountForm {
  email: string;
  password: string;
}

const AuthRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);
  const { registerWithEmail } = useAuth();

  const validationSchema = registerAccountSchema();

  const handleRegisterWithEmail = async ({ email, password }: RegisterAccountForm) => {
    if (isLoading) return;

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
      <h1>{t("auth:register.title")}</h1>

      {error && <p className="error-global">{error}</p>}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Field
            name="email"
            type="email"
            label={t("auth:register.form.inputs.email.label")}
            placeholder={t("auth:register.form.inputs.email.placeholder")}
            component={Input}
            prefixIcon="AlternateEmailTwoTone"
          />

          <Field
            name="password"
            type="password"
            label={t("auth:register.form.inputs.password.label")}
            placeholder={t("auth:register.form.inputs.password.placeholder")}
            component={Input}
            prefixIcon="PasswordTwoTone"
          />

        <Button
          type="submit"
          disabled={isLoading}
          variant="primary-with-arrow"
        >
          {isLoading ? (
            <span className="loading-dots">{t("auth:register.registering")}</span>
          ) : (
            t("auth:register.register")
          )}
        </Button>
        </form>
      </FormikProvider>
      <div className="underFromSection">
      <p>{t("auth:register.alreadyHaveAnAccount")}</p>
      <Button variant="secondary" className="small" onClick={goToAuthLogin}>{t("auth:register.goToLogin")}</Button>
    </div></div>
  );
};

export default (
  <BaseLayout>
    <AuthRegister />
  </BaseLayout>
);
