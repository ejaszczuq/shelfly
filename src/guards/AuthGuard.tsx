import React from "react";
import { Navigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import { IChildren } from "@src/types/IChildren.types";
import { useAuth } from "@src/contexts/Auth.context";
import LoadingScreen from "@src/views/LoadingScreen/LoadingScreen";

// AuthGuard – blokowanie dostępu do stron
const AuthGuard = ({ children }: IChildren) => {
  // Pobranie authStatus z useAuth(), czyli Auth.context.tsx
  const { authStatus } = useAuth();

  // ------- Co robi ten plik?
  // Sprawdza, czy uzytkownik jest zalogowany.
  // Jesli nie – przekierowuje na strone logowania.

  if (authStatus === "logging") return <LoadingScreen />; // Wyswietlenie ekranu ladowania
  if (authStatus === "loggedOut") return <Navigate to={PATHS.authLogin.path} />; // Nie zalogowany -> "/login"

  return <>{children}</>; // Zalogowany
};

// Jest to uzywane w app.routes.tsx:
/*
    <AuthGuard>
      <Outlet />
    </AuthGuard>
*/
export default AuthGuard;
