import React from "react";
import { useTranslation } from "react-i18next";

import BaseLayout from "@src/components/layouts/BaseLayout/BaseLayout";

import "./LoadingScreen.scss";

const LoadingScreen = () => {
  const { t } = useTranslation("common");

  return (
    <BaseLayout>
      <div className="loading-screen">
        <h1 className="loading-dots">{t("loading")}</h1>
      </div>
    </BaseLayout>
  );
};

export default LoadingScreen;
