import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import { appRoutes } from "@src/router/app.routes";

import "@translations/i18n";

import "@scss/reset.scss";
import "@scss/layers.scss";
import "@scss/variables.scss";
import "@scss/typography.scss";
import "@scss/mixins.scss";
import "@scss/utils.scss";

export const router = createBrowserRouter([appRoutes]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
