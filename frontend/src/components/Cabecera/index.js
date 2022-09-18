import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoHackAGram from "../../assets/images/logo.png";
import MenuIcon from "../MenuIcon";
import HomeIcon from "../HomeIcon";
import SearchIcon from "../SearchIcon";

const Cabecera = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          classNmae="header-logo "
          src={logoHackAGram}
          alt="Logo Hack a Gram"
        />
      </Link>
      <form className="header-searcher">
        <input type="search" placeholder="¿Qué tipo de foto quieres buscar?" />
        <button>
          <SearchIcon />
        </button>
      </form>
      <button className="header-button">
        <HomeIcon />
      </button>
      <button onClick={toggleMenu} className="header-button">
        <MenuIcon />
      </button>
      <nav className={`header-nav ${menu ? "isActive" : ""}`}>
        <ul className="header-ul">
          <li className="header-li">
            <Link to="/login">Login</Link>
          </li>
          <li className="header-li">
            <Link to="/register">Regístrate</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Cabecera;
