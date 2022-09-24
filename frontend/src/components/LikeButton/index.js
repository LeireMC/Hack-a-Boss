import "./styles.css";
import { LikedIcon, UnlikedIcon } from "../LikeIcons";

const LikeButton = ({ idPost, token, setNumLikes, setIsLiked, isLiked }) => {
  return (
    <button
      onClick={async (event) => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/post/${idPost}/like`,
            {
              method: "POST",
              headers: {
                Authorization: token,
              },
            }
          );
          const body = await res.json();

          setNumLikes(body.data.numLikes.numLikes);
          setIsLiked(body.data.liked);

          if (!res.ok) {
            throw new Error(body.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      }}
      className="heart"
    >
      {isLiked && <LikedIcon />}
      {!isLiked && <UnlikedIcon />}
    </button>
  );
};

export default LikeButton;
