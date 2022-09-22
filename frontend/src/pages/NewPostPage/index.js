import { Navigate } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm";
import { useTokenContext } from "../../context/TokenContext";

const NewPostPage = () => {
  const { token } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>New post</h2>

      <NewPostForm token={token} />
    </section>
  );
};

export default NewPostPage;
