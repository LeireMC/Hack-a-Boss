import "./styles.css";
import SearchIcon from "../SearchIcon";

const SearchBar = () => {
  return (
    <form className="header-searcher">
      <input type="search" placeholder="¿Qué tipo de foto quieres buscar?" />
      <button>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
