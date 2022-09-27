import "./styles.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenContext } from "../../context/TokenContext";
import DefaultPhotoNewPost from "../DefaultPhotoNewPost/DefaultoPhotoPost";

const NewPostForm = ({ addNewPost }) => {
  const [authorComment, setAuthorComment] = useState("");
  const [hashtag, setHashtag] = useState("");
  /*   const [newPhotoPostPreview, setNewPhotoPostPreview] = useState(""); */
  const { token } = useTokenContext();

  const navigate = useNavigate();
  const imageRef = useRef(null);
  /*  const newPhotoPost = useRef(null); */

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const file = imageRef.current.files[0];

            console.log(file);

            const formData = new FormData();

            formData.append("authorComment", authorComment);
            formData.append("hashtag", hashtag);
            formData.append("post_photo", file);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/posts/new`,
              {
                method: "POST",
                headers: {
                  Authorization: token,
                },

                body: formData,
              }
            );

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            addNewPost(body.data);
            toast.success(body.message);
            navigate("/");
            setAuthorComment("");
            setHashtag("");
            imageRef.current.value = "";
          } catch (error) {
            console.error(error.message);
            toast.error(error.message);
          }
        }}
      >
        <section>
          <ul className="newPostContainer">
            {/* previsualizacion */}

            {/* previsualizacion */}

            <li>
              <DefaultPhotoNewPost />
              <input
                id="image"
                type="file"
                ref={imageRef}
                multiple
                hidden
                accept="image/*"
              ></input>
              <label className="button" htmlFor="image">
                Seleccionar imagenes
              </label>
            </li>

            <li>
              <label htmlFor="authorComment">Comentario</label>
              <textarea
                className="textarea"
                id="authorComment"
                value={authorComment}
                onChange={(event) => {
                  setAuthorComment(event.target.value);
                }}
                required
              />
            </li>
            <li>
              <label htmlFor="hashtag">Hashtag</label>
              <input
                id="hashtag"
                placeholder="Introduce los hashtag separados por una coma"
                value={hashtag}
                onChange={(event) => {
                  setHashtag(event.target.value);
                }}
              />
            </li>

            <button className="button">Publicar Post</button>
          </ul>
        </section>
      </form>
    </>
  );
};

export default NewPostForm;
