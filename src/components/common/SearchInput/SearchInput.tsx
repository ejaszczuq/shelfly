import React from "react";
import DynamicIcon from "@src/components/common/DynamicIcon";
import { t } from "i18next";

import "./SearchInput.scss";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="input-section">
      <DynamicIcon iconName="SearchTwoTone" fontSize="medium" color="action" className="input-icon" />
      <input
        type="text"
        placeholder={placeholder ?? t("common:searchBooks") ?? "Szukaj książek..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
