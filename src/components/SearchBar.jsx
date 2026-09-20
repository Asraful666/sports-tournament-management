import { useState } from "react";

function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchText(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchText("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="global-search">

      <span className="search-icon">
        🔎
      </span>

      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {searchText && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
        >
          ✕
        </button>
      )}

    </div>
  );
}

export default SearchBar;