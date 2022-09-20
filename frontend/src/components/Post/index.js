import PhotoSlider from "../PhotoSlider";
import "./styles.css";

const Post = ({ post }) => {
  const { photos, username, idPost } = post;
  console.log(post);

  console.log(post.idPost);
  return (
    <>
      {photos.length > 0 && (
        <PhotoSlider idPost={idPost} photos={photos} username={username} />
      )}
    </>
  );
};

export default Post;
