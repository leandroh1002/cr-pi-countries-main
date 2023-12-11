// SearchBar.jsx
import React, { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const { onSearch } = props;
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Buscar Country ID" onChange={handleChange} value={searchInput} />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}
