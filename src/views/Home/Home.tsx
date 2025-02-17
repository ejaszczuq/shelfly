import React from "react";
import { useTranslation } from "react-i18next";

import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1>{t("common:home")}</h1>
    </div>
  );
};

export default Home;
