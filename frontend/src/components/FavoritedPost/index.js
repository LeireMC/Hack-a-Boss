import PostsList from "../PostsList";
import { useState, useEffect } from "react";
import { userFavoritedPostToPostList } from "../../utils/favoritesPostToPostList";

const FavoritedPost = ({
  favoritedPosts,
  addComment,
  commentposts,
  removeFavorite,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(userFavoritedPostToPostList(favoritedPosts, commentposts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setPosts(userFavoritedPostToPostList(favoritedPosts, commentposts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentposts]);

  return (
    <section>
      {posts.length > 0 ? (
        <section className="postListContainer">
          <PostsList
            posts={posts}
            addComment={addComment}
            removeFavorite={removeFavorite}
          />
        </section>
      ) : (
        <p>Este usuario aún no ha subido post</p>
      )}
    </section>
  );
};

export default FavoritedPost;
