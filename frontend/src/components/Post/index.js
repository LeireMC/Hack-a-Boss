import "./styles.css";
import PhotoSlider from "../PhotoSlider";
/* import Modal from "../Modal"; */

const Post = ({ post, setOpenModal }) => {
  const { photos, username, idPost } = post;

  return (
    <>
      {photos.length > 0 && (
        <PhotoSlider
          idPost={idPost}
          photos={photos}
          username={username}
          setOpenModal={setOpenModal}
        />
      )}
      {/*       <Modal /> */}
    </>
  );
};

export default Post;
