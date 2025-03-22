import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "firebase/auth";

interface FirestoreUser extends Partial<User> {
  displayName?: string;
}

export const saveUserToFirestore = async (user: FirestoreUser) => {
  if (!user || !user.uid) throw new Error("🚨 User data is missing!");

  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    console.log("Creating new user in Firestore:", user.uid);

    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Anonymous",
      createdAt: serverTimestamp(),
      role: "user"
    });
  } else {
    console.log("User already exists in Firestore.");
  }
};
