import { Outlet, RouteObject } from "react-router-dom";

import { PATHS } from "./paths";

import Home from "@views/Home/Home";
import NotFound from "@views/NotFound/NotFound";

export const appRoutes: RouteObject = {
  element: (
    <>
      <Outlet />
    </>
  ),

  children: [
    {
      path: PATHS.main.path,
      element: <Home />
    },
    {
      path: PATHS.notFound.path,
      element: <NotFound />
    }
  ]
};
