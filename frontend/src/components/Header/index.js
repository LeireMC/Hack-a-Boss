import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoHackAGram from "../../assets/images/logo.png";
import MenuIcon from "../MenuIcon";
import HomeIcon from "../HomeIcon";
import SearchBar from "../SearchBar";
import NotLoggedUserMenu from "../NotLoggedUserMenu";
/* import LoggedUserMenu from "../LoggedUserMenu"; */

const Header = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header-logo "
          src={logoHackAGram}
          alt="Logo Hack a Gram"
        />
      </Link>
      <SearchBar />
      <button className="header-button">
        <HomeIcon />
      </button>
      <button onClick={toggleMenu} className="header-button">
        <MenuIcon />
      </button>
      <NotLoggedUserMenu menu={menu} />
      {/* <LoggedUserMenu menu={menu} /> */}
    </header>
  );
};

export default Header;
