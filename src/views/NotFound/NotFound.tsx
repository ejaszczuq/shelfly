import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import BaseLayout from "@src/components/layouts/BaseLayout/BaseLayout";

import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);

  const handleGoHome = () => navigate(PATHS.main.path);

  return (
    <div className="not-found">
      <h1 className="title">404</h1>
      <p className="subtitle">{t("common:notFound.title")}</p>

      <button className="button" onClick={handleGoHome}>{t("common:notFound.buttonText")}</button>
    </div>
  );
};

export default (
  <BaseLayout>
    <NotFound />
  </BaseLayout>
);
