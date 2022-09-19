import PhotoSlider from "../PhotoSlider";
import "./styles.css";

const Post = ({ post }) => {
  const { photos, username } = post;
  return (
    <>
      {/* {photos.length > 0 && (
        <img
          className="PostPhoto"
          src={`${process.env.REACT_APP_API_URL}/posts/${photos[0].name}`}
          alt={`Created by ${username}`}
        />
      )} */}
      {photos.length > 0 && <PhotoSlider photos={photos} username={username} />}
    </>
  );
};

export default Post;
