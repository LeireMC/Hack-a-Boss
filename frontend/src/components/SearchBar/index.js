import "./styles.css";
import SearchIcon from "../SearchIcon";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  console.log(search);
  return (
    <form
      className="header-searcher"
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/posts?search=rojo`
          );

          console.log(res);

          if (!res.ok) {
            console.log(res);
            throw new Error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <input
        type="search"
        placeholder="¿Qué tipo de foto quieres buscar?"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
