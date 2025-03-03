import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { AppConfig } from "@src/config/config";

//inicialization Firebase app
const app = initializeApp(AppConfig.firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
