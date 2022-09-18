import "./styles.css";

const Post = ({ post }) => {
  return (
    <img
      className="PostPhoto"
      src={`${process.env.REACT_APP_API_URL}/posts/${post.photos[0].name}`}
      alt={`Created by ${post.username}`}
    />
  );
};

export default Post;
