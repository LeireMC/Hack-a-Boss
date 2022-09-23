import "./styles.css";
import SearchIcon from "../SearchIcon";
import { useState } from "react";

const SearchBar = ({ searchParams, setSearchParams }) => {
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  console.log(search);
  return (
    <form
      className="header-searcher"
      onSubmit={(event) => {
        event.preventDefault();

        const queryParams = {};

        if (search) {
          queryParams.search = search;
        }
        setSearchParams(new URLSearchParams(queryParams));
        /* const res = await fetch(
            `${process.env.REACT_APP_API_URL}/posts?search=${search}`
          );

          const body = await res.json();

          if (!res.ok) {
            console.log(body);
            throw new Error(body.message);
          }
          console.log(body.data);

          setPosts(body.data); */
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
