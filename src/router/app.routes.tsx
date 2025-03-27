import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { PATHS } from "./paths";

import { AuthProvider } from "@src/contexts/Auth.context";
import { BooksProvider } from "@src/contexts/Books.context";
import { ModalsProvider } from "@src/contexts/Modals.context";

import AuthGuard from "@src/guards/AuthGuard";
import AppModals from "@src/components/modals/AppModals";

import AuthLogin from "@src/views/AuthLogin/AuthLogin";
import AuthRegister from "@src/views/AuthRegister/AuthRegister";
import Home from "@views/Home/Home";
import NotFound from "@views/NotFound/NotFound";

export const authRoutes: RouteObject = {
  element: <Outlet />,
  children: [
    {
      path: PATHS.auth.path,
      element: <Navigate to={PATHS.authLogin.path} />
    },
    {
      path: PATHS.authLogin.path,
      element: AuthLogin
    },
    {
      path: PATHS.authRegister.path,
      element: AuthRegister
    }
  ]
};

// Every page in protectedRoutes is protected - access only for those logged in!
export const protectedRoutes: RouteObject = {
  element: (
    <AuthGuard>
      <BooksProvider>
        <ModalsProvider>
          <Outlet />
          <AppModals />
        </ModalsProvider>
      </BooksProvider>
    </AuthGuard>
  ),
  children: [
    {
      path: PATHS.main.path,
      element: Home
    }
  ]
};

export const otherRoutes: RouteObject = {
  element: <Outlet />,
  children: [
    {
      path: PATHS.notFound.path,
      element: NotFound
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
