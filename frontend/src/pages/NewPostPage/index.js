import { Navigate, Link } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../Contexts/TokenContext";

import logoHackAGram from "../../assets/images/logo.png";

const NewPostPage = () => {
  //llamamos a useTokenContext para recibir el token
  const { token, loggedUser } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header className="header">
        <Link to={`/profile/${loggedUser[0].id}`}>
          <img
            className="header-logo "
            src={logoHackAGram}
            alt="Logo Hack a Gram"
          />
        </Link>
      </header>

      <main className="homePage">
        {loggedUser.length > 0 && (
          <section>
            <NewPostForm loggedUser={loggedUser} token={token} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default NewPostPage;
