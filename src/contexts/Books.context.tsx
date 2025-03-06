import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "@src/firebase/firebase";
import { FirestoreBook, getUserBooks } from "@src/firebase/bookService";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextValue {
  books: FirestoreBook[];
  filteredBooks: FirestoreBook[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  fetchBooks: () => Promise<void>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const BooksContext = React.createContext(null as any);

export const BooksProvider = ({ children }: ContextProps) => {
  const [books, setBooks] = useState<FirestoreBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<FirestoreBook[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!books) return;

    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, searchQuery]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const booksCollectionRef = collection(db, "books");

    // Pobieranie tylko książek należących do zalogowanego użytkownika
    const booksQuery = query(booksCollectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(booksQuery, (snapshot) => {
      const updatedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreBook[];

      setBooks(updatedBooks);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup - odsubskrybowanie przy odmontowaniu komponentu
  }, []);

  // Pobieranie książek użytkownika
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedBooks = await getUserBooks();
      setBooks(fetchedBooks);
    } catch (error: any) {
      setError(error.message); // Tutaj mozna dopisac inny error
    } finally {
      setLoading(false);
    }
  };

  // Filtrowanie książek użytkownika
  const applyFilters = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(query);
      const authorMatch = book.author.toLowerCase().includes(query);
      const yearMatch = book.year.toString() === query;
      const genreMatch = Array.isArray(book.genre)
        ? book.genre.some((g) => g.toLowerCase().includes(query))
        : book.genre.toLowerCase().includes(query);

      return titleMatch || authorMatch || yearMatch || genreMatch;
    });

    setFilteredBooks(filtered);
  };

  const contextValue: ContextValue = {
    books,
    filteredBooks,
    loading,
    error,
    searchQuery,
    fetchBooks,
    setSearchQuery
  };

  return <BooksContext.Provider value={contextValue}>{children}</BooksContext.Provider>;
};

export const useBooks = (): ContextValue => {
  const context = React.useContext(BooksContext);

  if (context === undefined) {
    throw new Error("useBooks must be used within an BooksProvider");
  }

  return context;
};
