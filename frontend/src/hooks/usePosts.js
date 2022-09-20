import { useState, useEffect } from "react";
import { getAllPostsService } from "../services";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getAllPostsService();

        setPosts(data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, errorMessage };
};

export default usePosts;
