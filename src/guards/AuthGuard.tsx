import React from "react";
import { Navigate } from "react-router-dom";

import { PATHS } from "@src/router/paths";
import { IChildren } from "@src/types/IChildren.types";
import { useAuth } from "@src/contexts/Auth.context";
import LoadingScreen from "@src/views/LoadingScreen/LoadingScreen";

// AuthGuard - blocking access to sites
const AuthGuard = ({ children }: IChildren) => {
  // Retrieve authStatus from useAuth(), i.e. Auth.context.tsx
  const { authStatus } = useAuth();

  // ------- What does this file do?
  // Checks if the user is logged in.
  // If not - redirects to the login page.

  if (authStatus === "logging") return <LoadingScreen />; // Displaying the loading screen
  if (authStatus === "loggedOut") return <Navigate to={PATHS.authLogin.path} />; // Not logged in -> “/login”

  return <>{children}</>; // Logged in
};

// This is used in app.routes.tsx:
/*
    <AuthGuard>.
      <Outlet />
    </AuthGuard>.
*/
export default AuthGuard;
