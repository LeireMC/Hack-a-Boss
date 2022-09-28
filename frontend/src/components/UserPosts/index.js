import "./styles.css";
import PostsList from "../PostsList";
import { postUserToPostList } from "../../utils/postUserToPostList";
import { useState, useEffect } from "react";
import AlertIcon from "../AlertIcon";

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
        <section className="container, post">
          <AlertIcon />
          <p>Este usuario aún no ha subido post</p>
        </section>
      )}
    </section>
  );
};

export default UserPosts;
