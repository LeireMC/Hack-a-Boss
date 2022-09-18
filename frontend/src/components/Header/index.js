import "./styles.css";
import logoHackAGram from "../../assets/images/logo.png";
import Navbar from "../Navbar";
import Searcher from "../Searcher";

const Header = () => {
  return (
    <header>
      <img src={logoHackAGram} alt="Logo Hack a Gram" />
      <Searcher />
      <Navbar />
    </header>
  );
};

export default Header;
