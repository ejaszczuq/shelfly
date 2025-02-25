import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, DocumentData } from "firebase/firestore";
import { db } from "./firebase";

interface Book {
  id?: string; //optional
  title: string;
  author: string;
  year: number;
  genre: string;
  userId: string; // ID from Firebase Auth
  description: string;
}

//Firestore data type
export type FirestoreBook = Book & DocumentData;

//add new book
export const addBook = async (book: Book): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "books"), book);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

//update
export const updateBook = async (bookId: string, updatedBook: Partial<Book>): Promise<void> => {
  try {
    const bookDocRef = doc(db, "books", bookId);
    await updateDoc(bookDocRef, updatedBook);
    console.log("Document updated successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

//delete
export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    const bookDocRef = doc(db, "books", bookId);
    await deleteDoc(bookDocRef);
    console.log("Document deleted successfully!");
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

//get all books
export const getBooks = async (): Promise<FirestoreBook[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot.docs.map((doc) => {
      // Rzutowanie doc.data() na Book
      const data = doc.data() as Book;
      return { ...data, id: doc.id } as FirestoreBook;
    });
  } catch (e) {
    console.error("Error getting books: ", e);
    throw e;
  }
};

//get books by title
export const getBookByTitle = async (title: string): Promise<FirestoreBook | null> => {
  try {
    const q = query(collection(db, "books"), where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No book found with title: ${title}`);
      return null;
    }

    // Zakładamy, że tytuł jest unikalny → pobieramy pierwszy wynik
    const bookDoc = querySnapshot.docs[0];
    return { ...bookDoc.data(), id: bookDoc.id } as FirestoreBook;
  } catch (e) {
    console.error("Error getting book by title:", e);
    throw e;
  }
};

//get books by author
export const getBooksByAuthor = async (author: string): Promise<FirestoreBook[]> => {
  try {
    const q = query(collection(db, "books"), where("author", "==", author));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Book;
      return { ...data, id: doc.id };
    });
  } catch (e) {
    console.error("Error getting books by author: ", e);
    throw e;
  }
};

//get books by genre
export const getBooksByGenre = async (genre: string): Promise<FirestoreBook[]> => {
  try {
    const q = query(collection(db, "books"), where("genre", "==", genre));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Book;
      return { ...data, id: doc.id };
    });
  } catch (e) {
    console.error("Error getting books by genre: ", e);
    throw e;
  }
};
