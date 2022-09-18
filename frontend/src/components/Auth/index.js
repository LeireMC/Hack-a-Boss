import "./styles.css";
import { Link } from "react-router-dom";
/* import MenuLoggedUser from "../MenuLoggedUser";
import MenuNotLoggedUser from "../MenuNotLoggedUser"; */

const Auth = () => {
  return (
    <ul>
      <li>
        <Link to="/"></Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      {/* <MenuLoggedUser />
      <MenuNotLoggedUser /> */}
    </ul>
  );
};

export default Auth;
