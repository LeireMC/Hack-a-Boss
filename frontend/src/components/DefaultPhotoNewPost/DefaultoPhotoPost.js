import "./styles.css";
import defaultPhotoNewPost from "../../assets/images/defaultPostPhoto.avif";

const DefaultPhotoNewPost = ({ post_photo }) => {
  return (
    <>
      {!post_photo && (
        <img
          className="defaultPhotoNewPost"
          src={defaultPhotoNewPost}
          alt="Imagen por defecto"
        />
      )}
    </>
  );
};

export default DefaultPhotoNewPost;
