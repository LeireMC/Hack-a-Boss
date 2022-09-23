import { useState, useEffect } from "react";
import { getAllPostsService } from "../services";
import { useSearchParams } from "react-router-dom";
import { useTokenContext } from "../Contexts/TokenContext";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useTokenContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const addComment = (idPost, comment) => {
    console.log({ idPost, posts });
    const postIndex = posts.findIndex((post) => {
      return post.idPost === idPost;
    });

    console.log({ postIndex, post: posts[postIndex] });
    posts[postIndex].comments.unshift(comment);
    setPosts([...posts]);
  };

  /*   const addLike = (idPost, like) => {
    console.log({ idPost, posts });
    const postIndex = posts.findIndex((post) => {
      return post.idPost === idPost;
    });

    console.log({ postIndex, numLikes: posts[postIndex].likes.numLikes });
    posts[postIndex].likes.numLikes.push(like);
    setPosts([...posts]);
  }; */

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getAllPostsService(searchParams, token);

        setPosts(data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchParams, token]);

  return {
    searchParams,
    setSearchParams,
    posts,
    setPosts,
    loading,
    errorMessage,
    addComment,
  };
};

export default usePosts;
