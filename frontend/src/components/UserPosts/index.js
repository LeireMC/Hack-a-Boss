import PostsList from "../PostsList";
import { postUserToPostList } from "../../utils/postUserToPostList";
import { useState, useEffect } from "react";

const UserPosts = ({ userPosts, addComment }) => {
  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    setProfilePosts(postUserToPostList(userPosts));
  }, [userPosts]);

  return (
    <section>
      {profilePosts.length > 0 ? (
        <section className="postListContainer">
          <PostsList posts={profilePosts} addComment={addComment} />
        </section>
      ) : (
        <p>Este usuario aún no ha subido post</p>
      )}
    </section>
  );
};

export default UserPosts;
