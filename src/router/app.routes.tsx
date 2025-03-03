import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { PATHS } from "./paths";

import { AuthProvider } from "@src/contexts/Auth.context";

import AuthLogin from "@src/views/AuthLogin/AuthLogin";
import AuthRegister from "@src/views/AuthRegister/AuthRegister";
import Home from "@views/Home/Home";
import NotFound from "@views/NotFound/NotFound";
import AuthGuard from "@src/guards/AuthGuard";

export const authRoutes: RouteObject = {
  element: <Outlet />,
  children: [
    {
      path: PATHS.auth.path,
      element: <Navigate to={PATHS.authLogin.path} />
    },
    {
      path: PATHS.authLogin.path,
      element: <AuthLogin />
    },
    {
      path: PATHS.authRegister.path,
      element: <AuthRegister />
    }
  ]
};

// Kazda strona w protectedRoutes jest chroniona – dostep tylko dla zalogowanych!
export const protectedRoutes: RouteObject = {
  element: (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: PATHS.main.path,
      element: <Home />
    }
  ]
};

export const otherRoutes: RouteObject = {
  element: <Outlet />,
  children: [
    {
      path: PATHS.notFound.path,
      element: <NotFound />
    }
  ]
};

export const appRoutes: RouteObject = {
  element: (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
  children: [authRoutes, protectedRoutes, otherRoutes]
};
