import { useState, useEffect } from "react";

const usePost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/new`);

        const body = await res.json();

        if (!res.ok) {
          throw new Error("Unexpected error fetching API. Please try again");
        }

        setPost(body.data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const addNewPost = (newPost) => {
    setPost([newPost, ...post]);
  };

  return { post, addNewPost, loading, errorMessage };
};

export default usePost;
