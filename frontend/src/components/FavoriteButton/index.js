import "./styles.css";
import { FavoritedIcon, UnfavoritedIcon } from "../FavoritesIcons";

const FavoriteButton = ({ idPost, token, setIsFavorite, isFavorite }) => {
  return (
    <button
      onClick={async (event) => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/post/${idPost}/favorite`,
            {
              method: "POST",
              headers: {
                Authorization: token,
              },
            }
          );
          const body = await res.json();

          console.log(body.data.favorite);

          setIsFavorite(body.data.favorite);
          console.log(isFavorite);

          if (!res.ok) {
            throw new Error(body.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      }}
      className="bookmark"
    >
      {isFavorite && <FavoritedIcon />}
      {!isFavorite && <UnfavoritedIcon />}
    </button>
  );
};

export default FavoriteButton;
