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
  selectedGenres: string[];
  fetchBooks: () => Promise<void>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const BooksContext = React.createContext<ContextValue>(null as any);

export const BooksProvider = ({ children }: ContextProps) => {
  const [books, setBooks] = useState<FirestoreBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<FirestoreBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!books) return;
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, searchQuery, selectedGenres]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const booksCollectionRef = collection(db, "books");
    const booksQuery = query(booksCollectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(booksQuery, (snapshot) => {
      const updatedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreBook[];

      setBooks(updatedBooks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBooks = await getUserBooks();
      setBooks(fetchedBooks);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funkcja pomocnicza do ekstrakcji gatunków z książki
const extractGenres = (genreData: any): string[] => {
  if (!genreData) return [];
  if (Array.isArray(genreData)) {
    return genreData.flatMap((g) =>
      g.includes(",") ? g.split(",").map((s:string) => s.trim()) : g.trim()
    );
  }
  return genreData.split(",").map((s: string) => s.trim());
};

const applyFilters = () => {
  const queryLower = searchQuery.toLowerCase().trim();

  let filtered = books.filter((book) => {
    // Filtracja po zapytaniu wyszukiwania
    const titleMatch = book.title.toLowerCase().includes(queryLower);
    const authorMatch = book.author.toLowerCase().includes(queryLower);
    const yearMatch = book.year.toString() === queryLower;
    // book.genre może być stringiem lub tablicą
    const genreMatch = extractGenres(book.genre).some((g) =>
      g.toLowerCase().includes(queryLower)
    );

    return titleMatch || authorMatch || yearMatch || genreMatch;
  });

  // Filtracja po wybranych gatunkach – jeśli jakieś zostały zaznaczone
  if (selectedGenres.length > 0) {
    filtered = filtered.filter((book) => {
      const bookGenres = extractGenres(book.genre);
      // Sprawdzamy czy choć jeden z gatunków książki znajduje się w selectedGenres
      return bookGenres.some((g) => selectedGenres.includes(g));
    });
  }

  setFilteredBooks(filtered);
};

  const contextValue: ContextValue = {
    books,
    filteredBooks,
    loading,
    error,
    searchQuery,
    selectedGenres,
    fetchBooks,
    setSearchQuery,
    setSelectedGenres
  };

  return <BooksContext.Provider value={contextValue}>{children}</BooksContext.Provider>;
};

export const useBooks = (): ContextValue => {
  const context = React.useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
