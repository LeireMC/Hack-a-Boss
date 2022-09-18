import "./styles.css";
import Post from "../Post";

const PostsList = ({ posts }) => {
  return posts.length ? (
    <ul className="postListPhotos">
      {posts.map((post) => {
        return (
          <li key={post.idPost} className="photoColumn">
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  ) : (
    <p>no hay posts todavia</p>
  );
};

export default PostsList;
