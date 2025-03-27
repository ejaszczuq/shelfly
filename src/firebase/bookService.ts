import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";

export interface FirestoreBook {
  id?: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  src?: string;
  userId: string;
}

// Adding a book to the Firestore in a user subcollection
export const addBook = async (book: Omit<FirestoreBook, "userId">) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const booksRef = collection(db, "books");
    return await addDoc(booksRef, { ...book, userId: user.uid });
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

// Downloading books of the logged-in user only
export const getUserBooks = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const booksRef = collection(db, "books");
    const q = query(booksRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      id: docSnap.id
    })) as FirestoreBook[];
  } catch (e) {
    throw e;
  }
};

// Downloading one user's book for editing
export const getUserBookById = async (bookId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists()) {
      console.warn(`ID book not found: ${bookId}`);
      return null;
    }

    const bookData = bookDoc.data() as FirestoreBook;
    return bookData.userId === user.uid ? { ...bookData, id: bookDoc.id } : null;
  } catch (e) {
    throw e;
  }
};

// Edit user book
export const updateUserBook = async (bookId: string, updatedBook: Partial<FirestoreBook>) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists() || bookDoc.data()?.userId !== user.uid) {
      throw new Error("No access to remove this book.");
    }

    return await updateDoc(bookDocRef, updatedBook);
  } catch (e) {
    throw e;
  }
};

// Deleting a user's book
export const deleteUserBook = async (bookId: string): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists() || bookDoc.data()?.userId !== user.uid) {
      throw new Error("No access to remove this book.");
    }

    await deleteDoc(bookDocRef);
  } catch (e) {
    throw e;
  }
};

// Download book by title only for logged-in user
export const getUserBookByTitle = async (title: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const booksRef = collection(db, "books");
    const q = query(booksRef, where("userId", "==", user.uid), where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const bookDoc = querySnapshot.docs[0];
    return { ...bookDoc.data(), id: bookDoc.id } as FirestoreBook;
  } catch (e) {
    throw e;
  }
};

// Downloading user books by author
export const getUserBooksByAuthor = async (author: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const booksRef = collection(db, "books");
    const q = query(booksRef, where("userId", "==", user.uid), where("author", "==", author));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      id: docSnap.id
    })) as FirestoreBook[];
  } catch (e) {
    throw e;
  }
};

// Downloading user books by genre
export const getUserBooksByGenre = async (genre: string): Promise<FirestoreBook[]> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("The user is not logged in.");

    const booksRef = collection(db, "books");
    const q = query(booksRef, where("userId", "==", user.uid), where("genre", "array-contains", genre));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      id: docSnap.id
    })) as FirestoreBook[];
  } catch (e) {
    throw e;
  }
};
