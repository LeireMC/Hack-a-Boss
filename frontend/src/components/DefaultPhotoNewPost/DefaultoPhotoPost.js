import "./styles.css";
import defaultPhotoNewPost from "../../assets/images/defaultPostPhoto.avif";
/////////////definir alt de imagen
const DefaultPhotoNewPost = ({ post_photo, alt }) => {
  return (
    <>
      {!post_photo && (
        <img
          className="defaultPhotoNewPost"
          src={defaultPhotoNewPost}
          alt={` ${alt}`}
        />
      )}
      {/*  {post_photo && (
        <img
          className="defaultPhotoNewPost"
          ////////////definir peticion para recuperar imagen previa de post
          src={`${process.env.REACT_APP_API_URL}/avatar/${post_photo}`}
          alt={`${alt}`}
        />
      )} */}
    </>
  );
};

export default DefaultPhotoNewPost;
