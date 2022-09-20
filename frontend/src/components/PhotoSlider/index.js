import "./styles.css";
import { useState } from "react";
/* import { useNavigate } from "react-router-dom"; */
import { RightArrow, LeftArrow } from "../ArrowIcons";
/* import Modal from "../Modal"; */

const PhotoSlider = ({ photos, username, setOpenModal }) => {
  /*   const navigate = useNavigate(); */

  const [currentPhoto, setCurrentPhoto] = useState(0);

  const previousPhoto = () => {
    if (currentPhoto === photos.length - 1) {
      setCurrentPhoto(0);
      return;
    }

    setCurrentPhoto(currentPhoto + 1);
  };

  const nextPhoto = () => {
    if (currentPhoto === 0) {
      setCurrentPhoto(photos.length - 1);
      return;
    }

    setCurrentPhoto(currentPhoto - 1);
  };

  return (
    <section className="photo-slider">
      {photos.map((photo, index) => {
        return (
          <>
            {index === currentPhoto && (
              <img
                className="PostPhoto"
                src={`${process.env.REACT_APP_API_URL}/post/${photo.name}`}
                alt={`Created by ${username}`}
              />
            )}
          </>
        );
      })}

      {photos.length > 1 && (
        <>
          <button className="previous_photo" onClick={previousPhoto}>
            <LeftArrow />
          </button>
          <button className="next_photo" onClick={nextPhoto}>
            <RightArrow />
          </button>
        </>
      )}
    </section>
  );
};

export default PhotoSlider;
