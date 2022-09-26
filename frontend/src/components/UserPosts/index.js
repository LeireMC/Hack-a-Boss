import PostsList from "../PostsList";
import { postUserToPostList } from "../../utils/postUserToPostList";
import { useState, useEffect } from "react";

const UserPosts = ({ user, addComment, commentposts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postUserToPostList(user, commentposts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setPosts(postUserToPostList(user, commentposts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentposts]);

  return (
    <section>
      {posts.length > 0 ? (
        <section className="postListContainer">
          <PostsList posts={posts} addComment={addComment} />
        </section>
      ) : (
        <p>Este usuario aún no ha subido post</p>
      )}
    </section>
  );
};

export default UserPosts;
