import { Navigate } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ErrorMessage from "../../components/ErrorMessage";
import { useTokenContext } from "../../context/TokenContext";
import usePost from "../../hooks/usePost";

const NewPostPage = () => {
  const { addNewPost, setSearchParams, searchParams, loading, errorMessage } =
    usePost();
  //llamamos a useTokenContext para recibir el token
  const { token } = useTokenContext();
  console.log(token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />

      <main className="homePage">
        {loading && <Spinner />}
        <section>
          <NewPostForm token={token} addNewPost={addNewPost} />
        </section>
        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </main>

      <Footer />
    </>
  );
};

export default NewPostPage;
