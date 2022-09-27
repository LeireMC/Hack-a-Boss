import { useState, useEffect } from "react";
import { getUserFavorites } from "../services";
import { useTokenContext } from "../Contexts/TokenContext";
import { toast } from "react-toastify";

const useFavoritedPosts = () => {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useTokenContext();

  const removeFavorite = (idPost) => {
    const postIndex = favoritedPosts.findIndex((post) => {
      return post.idPost === idPost;
    });
    favoritedPosts.splice(postIndex, 1);
    setFavoritedPosts([...favoritedPosts]);
  };

  useEffect(() => {
    const loadFavoritedPosts = async () => {
      try {
        setLoading(true);

        const data = await getUserFavorites(token);
        if (!data) {
          setFavoritedPosts([]);
        } else {
          setFavoritedPosts(data);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritedPosts();
  }, [token]);

  return {
    favoritedPosts,
    setFavoritedPosts,
    loading,
    removeFavorite,
  };
};

export default useFavoritedPosts;
