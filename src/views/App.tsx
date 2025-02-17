import React from "react";

import { Router } from "@router/router";

import "@translations/i18n";

import "@scss/reset.scss";
import "@scss/variables.scss";
import "@scss/typography.scss";
import "@scss/mixins.scss";

const App = () => {
  return <Router />;
};

export default App;
