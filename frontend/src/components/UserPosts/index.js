import PostsList from "../PostsList";
import { postUserToPostList } from "./postUserFunction";
import { useState } from "react";

const UserPosts = ({ user, addComment }) => {
  const [posts] = useState(postUserToPostList(user));

  return (
    <section>
      {posts !== undefined && posts.length > 0 ? (
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
