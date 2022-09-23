import { Navigate } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm";
import { useTokenContext } from "../../context/TokenContext";
import usePost from "../../hooks/usePost";

const NewPostPage = () => {
  const { addNewPost } = usePost();
  //llamamos a useTokenContext para recibir el token
  const { token } = useTokenContext();
  console.log(token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>New post</h2>

      <NewPostForm token={token} addNewPost={addNewPost} />
    </section>
  );
};

export default NewPostPage;
