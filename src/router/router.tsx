import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./app.routes";

export const router = createBrowserRouter([appRoutes]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
