import "./styles.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenContext } from "../../context/TokenContext";

const NewPostForm = ({ addNewPost }) => {
  const [authorComment, setAuthorComment] = useState("");
  const [hashtag, setHashtag] = useState("");

  const { token } = useTokenContext();

  const navigate = useNavigate();
  const imageRef = useRef(null);

  return (
    <>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const file = imageRef.current.files[0];

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
        <section className="newPostContainer">
          <ul>
            <li>
              <label htmlFor="image">Image:</label>
              <input id="image" type="file" ref={imageRef} accept="image/*" />
            </li>
            <li>
              <label htmlFor="authorComment">authorComment:</label>
              <textarea
                id="authorComment"
                value={authorComment}
                onChange={(event) => {
                  setAuthorComment(event.target.value);
                }}
                required
              />
            </li>
            <li>
              <label htmlFor="hashtag">hashtag:</label>
              <input
                id="hashtag"
                placeholder="Introduce los hashtag separados por una coma"
                value={hashtag}
                onChange={(event) => {
                  setHashtag(event.target.value);
                }}
              />
            </li>

            <button className="button">Create Post</button>
          </ul>
        </section>
      </form>
    </>
  );
};

export default NewPostForm;
