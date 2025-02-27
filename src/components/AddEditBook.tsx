import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addBook, updateBook, FirestoreBook } from "@src/firebase/bookService";


interface AddEditBookProps {
  book?: FirestoreBook;
}

const AddEditBook: React.FC<AddEditBookProps> = ({ book }) => {
  const [title, setTitle] = useState(book ? book.title : "");
  const [author, setAuthor] = useState(book ? book.author : "");
  const [year, setYear] = useState(book ? book.year : new Date().getFullYear());
  const [genre, setGenre] = useState(book ? book.genre : "");
  const [description, setDescription] = useState(book ? book.description : "");

 
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      year,
      genre,
      description,
      userId: "yourUserId", 
    };

    try {
      if (book?.id) {
        
        await updateBook(book.id, bookData);
      } else {
       
        await addBook(bookData);
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tytuł"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
        placeholder="Rok"
      />
      <input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Gatunek (np. Fantasy, Sci-Fi)"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis"
      />
      <button type="submit">Zapisz</button>
    </form>
  );
};

export default AddEditBook;
