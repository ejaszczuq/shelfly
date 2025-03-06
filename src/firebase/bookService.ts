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

// Dodawanie książki do Firestore w subkolekcji użytkownika
export const addBook = async (book: Omit<FirestoreBook, "userId">) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

    const booksRef = collection(db, "books");
    return await addDoc(booksRef, { ...book, userId: user.uid });
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

// Pobieranie książek tylko zalogowanego użytkownika
export const getUserBooks = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

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

// Pobranie jednej książki użytkownika do edycji
export const getUserBookById = async (bookId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists()) {
      console.warn(`Nie znaleziono książki o ID: ${bookId}`);
      return null;
    }

    const bookData = bookDoc.data() as FirestoreBook;
    return bookData.userId === user.uid ? { ...bookData, id: bookDoc.id } : null;
  } catch (e) {
    throw e;
  }
};

// Edycja książki użytkownika
export const updateUserBook = async (bookId: string, updatedBook: Partial<FirestoreBook>) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists() || bookDoc.data()?.userId !== user.uid) {
      throw new Error("Brak dostępu do edycji tej książki.");
    }

    return await updateDoc(bookDocRef, updatedBook);
  } catch (e) {
    throw e;
  }
};

// Usuwanie książki użytkownika
export const deleteUserBook = async (bookId: string): Promise<void> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

    const bookDocRef = doc(db, "books", bookId);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists() || bookDoc.data()?.userId !== user.uid) {
      throw new Error("Brak dostępu do usunięcia tej książki.");
    }

    await deleteDoc(bookDocRef);
  } catch (e) {
    throw e;
  }
};

// Pobieranie książki po tytule tylko dla zalogowanego użytkownika
export const getUserBookByTitle = async (title: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

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

// Pobieranie książek użytkownika po autorze
export const getUserBooksByAuthor = async (author: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

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

// Pobieranie książek użytkownika po gatunku
export const getUserBooksByGenre = async (genre: string): Promise<FirestoreBook[]> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Użytkownik nie jest zalogowany.");

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
