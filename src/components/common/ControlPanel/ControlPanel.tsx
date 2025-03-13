import React, { useState } from "react";
import { useBooks } from "@src/contexts/Books.context";
import "./ControlPanel.scss";
import SearchInput from "../SearchInput/SearchInput";

interface IControlPanel {
  labelName: string;
}

const ControlPanel: React.FC<IControlPanel> = ({ labelName }) => {
  const { books, selectedGenres, setSelectedGenres } = useBooks();
  const [genreSearch, setGenreSearch] = useState("");

  // Funkcja pomocnicza do rozdzielania gatunków (obsługa formatu tablica lub string)
  const extractGenres = (genreData: any): string[] => {
    if (!genreData) return [];
    if (Array.isArray(genreData)) {
      return genreData.flatMap((g) =>
        g.includes(",") ? g.split(",").map((s: string) => s.trim()) : [g.trim()]
      );
    }
    return genreData.split(",").map((s: string) => s.trim());
  };

  // Pobranie wszystkich unikalnych gatunków
  const allGenres = Array.from(
    new Set(books.flatMap((book) => extractGenres(book.genre)))
  ).filter(Boolean);

  // Filtrowanie gatunków przy użyciu lokalnego stanu genreSearch
  const filteredGenres = genreSearch
    ? allGenres.filter((genre) =>
        genre.toLowerCase().includes(genreSearch.toLowerCase())
      )
    : [];

  // Obsługa zmiany checkboxa
  const handleCheckboxChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="control-panel">
      <p>{labelName}</p>
      <hr />
      {/* Input wyszukiwania gatunków */}
      <SearchInput
        value={genreSearch}
        onChange={(e) => setGenreSearch(e.target.value)}
        placeholder="Filtruj gatunki..."
      />

      {/* Sekcja gatunków wyszukiwanych */}
      {genreSearch && (
        <>
          <hr />
          <p>Gatunki wyszukiwane</p>
          {filteredGenres.length > 0 ? (
            <><ul>
              {filteredGenres.map((genre) => (
                <li key={`filtered-${genre}`}>
                  <input
                    type="checkbox"
                    name={`genre_checkbox-${genre}`}
                    id={`genre_checkbox-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleCheckboxChange(genre)} />
                  <label htmlFor={`genre_checkbox-${genre}`}>{genre}</label>
                </li>
              ))}
            </ul><br/></>
          ) : (
            <><span>Brak gatunków</span><br /><br /></>
          )}
        </>
      )}

     

      {/* Sekcja wszystkich gatunków */}
      
      <p>Wszystkie gatunki</p>
      {allGenres.length > 0 ? (
        <ul>
          {allGenres.map((genre) => (
            <li key={`all-${genre}`}>
              <input
                type="checkbox"
                name={`genre_checkbox-${genre}`}
                id={`genre_checkbox-${genre}`}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleCheckboxChange(genre)}
              />
              <label htmlFor={`genre_checkbox-${genre}`}>{genre}</label>
            </li>
          ))}
        </ul>
      ) : (
        <span>Brak gatunków</span>
      )}
    </div>
  );
};

export default ControlPanel;
