import React, { useEffect, useState } from "react";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from "firebase/auth";

import { PATHS } from "@src/router/paths";
import { auth, googleProvider } from "@src/firebase/firebase";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextValue {
  user: User | null;
  authStatus: AuthStatus;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  registerWithEmail: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>; 
}

export type AuthStatus = "logging" | "loggedIn" | "loggedOut";

// Create a context - a central place to store the user
const AuthContext = React.createContext(null as any);

// Main part: AuthProvider - provides the context for the entire application
export const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>(null); // stores the state of the user
  const [authStatus, setAuthStatus] = useState<AuthStatus>("logging"); // stores the authentication status (authStatus)

  const navigate = useNavigate();

  // This effect listens for changes in the authorization state and updates the state with the user's data accordingly
  // fires at the start of the component and if the user has stored session data in the browser it logs him back in, etc.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If logged in
        setUser(user);
        await user.getIdToken();
        setAuthStatus("loggedIn");
      } else {
        setUser(null);
        setAuthStatus("loggedOut");
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteAccount = async () => {
    if (!user) {
      throw new Error("Brak zalogowanego użytkownika.");
    }

    try {
      await deleteUser(user);  // Delete user account
      setUser(null);
      setAuthStatus("loggedOut");
      navigate(PATHS.authLogin.path);  // Redirect to login page when account is deleted
    } catch (error) {
      throw new Error("Wystąpił problem przy usuwaniu konta.");
    }
  };

  // AuthProvider provides login, registration, logout, etc. functions.
  const loginWithGoogle = async () => {
    setAuthStatus("logging");

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setAuthStatus("loggedIn");
      return userCredential;
    } catch (error) {
      setAuthStatus("loggedOut");
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setAuthStatus("logging");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthStatus("loggedIn");
      return userCredential;
    } catch (error) {
      setAuthStatus("loggedOut");
      throw error;
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    setAuthStatus("logging");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthStatus("loggedIn");
      return userCredential;
    } catch (error) {
      setAuthStatus("loggedOut");
      throw error;
    }
  };

  // this method works only for accounts created via email
  const resetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthStatus("loggedOut");
      navigate(PATHS.authLogin.path);
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  const contextValue: ContextValue = {
    user,
    authStatus,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    resetPassword,
    logout,
    deleteAccount
  };
  // Provides the context for the entire application.
  /// Provides the entire context (user, authStatus, login methods) to all components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// A way to easily access the context
export const useAuth = (): ContextValue => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
  // Thanks to this, in any component, you can access it like this:
  /// const { user, logout } = useAuth();
};
