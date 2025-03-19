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

// Tworzenie kontekstu - centralnego miejsca do przechowywania uzytkownika
const AuthContext = React.createContext(null as any);

// Glowna czesc: AuthProvider - dostarcza kontekst calej aplikacji
export const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>(null); // przechowuje stan uzytkownika (user)
  const [authStatus, setAuthStatus] = useState<AuthStatus>("logging"); // przechowuje status uwierzytelnienia (authStatus)

  const navigate = useNavigate();

  // Ten efekt nasluchuje na zmiany stanu autoryzacji i odpowiednio aktualizuje state z danymi usera
  // odpala sie na starcie komponentu i jesli user ma zapiosane dane sesji w przegladarce to logguje go ponownie itd.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Jesli jest zalogowany
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
      await deleteUser(user);  // Usunięcie konta użytkownika
      setUser(null);
      setAuthStatus("loggedOut");
      navigate(PATHS.authLogin.path);  // Przekierowanie na stronę logowania po usunięciu konta
    } catch (error) {
      throw new Error("Wystąpił problem przy usuwaniu konta.");
    }
  };

  // AuthProvider dostarcza funkcje logowania, rejestracji, wylogowania itp.
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

  // ta metoda dziala tylko dla kont zalozonych przez email
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
  // Udostepnienie kontekstu dla calej aplikacji
  /// Udostepnia caly kontekst (user, authStatus, metody logowania) wszystkim komponentom
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Sposob na latwy dostep do kontekstu
export const useAuth = (): ContextValue => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
  // Dzieki temu w dowolnym komponencie mozesz dostac sie doniego w taki sposob:
  /// const { user, logout } = useAuth();
};
