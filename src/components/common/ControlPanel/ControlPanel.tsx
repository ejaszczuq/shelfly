import React, { useState } from "react";
import { useBooks } from "@src/contexts/Books.context";
import { useTranslation } from "react-i18next";
import SearchInput from "../SearchInput/SearchInput";

import "./ControlPanel.scss";

interface IControlPanel {
  labelName: string;
}

const ControlPanel: React.FC<IControlPanel> = ({ labelName }) => {
  const { books, selectedGenres, setSelectedGenres } = useBooks();
  const [genreSearch, setGenreSearch] = useState("");
  const { t } = useTranslation(["common"]);

// Helper function to split species (support array or string format)
  const extractGenres = (genreData: any): string[] => {
    if (!genreData) return [];
    if (Array.isArray(genreData)) {
      return genreData.flatMap((g) =>
        g.includes(",") ? g.split(",").map((s: string) => s.trim()) : [g.trim()]
      );
    }
    return genreData.split(",").map((s: string) => s.trim());
  };

 // Downloading all unique genres
  const allGenres = Array.from(
    new Set(books.flatMap((book) => extractGenres(book.genre)))
  ).filter(Boolean);

 // Filtering genres using the local genreSearch state
  const filteredGenres = genreSearch
    ? allGenres.filter((genre) =>
        genre.toLowerCase().includes(genreSearch.toLowerCase())
      )
    : [];

 // Checkbox change handling
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
      {/* Input search - genres */}
      <SearchInput
        value={genreSearch}
        onChange={(e) => setGenreSearch(e.target.value)}
        placeholder={t("common:filterByGenres.search.placeholder")}


      />

      {/* Search species genres */}
      {genreSearch && (
        <div className="genre-search">
          <hr />
          <p>{t("common:filterByGenres.search.searchResults")}</p>
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
            <><span>{t("common:filterByGenres.noGenres")}</span><br /><br /></>
          )}
        </div>
      )}

     

      {/* All genres section */}
      <div className="all-genres">
      <p>{t("common:filterByGenres.allGenres")}</p>
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
        <span>{t("common:filterByGenres.noGenres")}</span>
      )}
      </div>
    </div>
  );
};

export default ControlPanel;
