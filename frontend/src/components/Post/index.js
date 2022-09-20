import "./styles.css";
import PhotoSlider from "../PhotoSlider";

const Post = ({ post }) => {
  const { photos, username, idPost } = post;

  return (
    <>
      {photos.length > 0 && (
        <PhotoSlider idPost={idPost} photos={photos} username={username} />
      )}
    </>
  );
};

export default Post;
