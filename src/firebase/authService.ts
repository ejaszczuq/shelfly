import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from "firebase/auth";

type TUserAuthData = {
  email: string;
  password: string;
};

// Login
export const login = async ({ email, password }: TUserAuthData): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Register
export const signup = async ({ email, password }: TUserAuthData): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

// Logout
export const logout = (): void => {
  signOut(auth);
};

// Listen for changes in the logged-in user's state
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
