import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NewPostForm = ({ token }) => {
  const [authorComment, setAuthorComment] = useState("");
  const [hashtag, setHashtag] = useState("");

  const navigate = useNavigate();

  const photoRef = useRef();

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const newPost = { authorComment, hashtag };

          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/new`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify(newPost),
            }
          );

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }

          const postPhotos = photoRef.current.files[0];

          if (postPhotos) {
            const formData = new FormData();

            formData.append("postPhotos", postPhotos);

            const photoRes = await fetch(
              `${process.env.REACT_APP_API_URL}/posts/${body.data.id}/photo`,
              {
                method: "PUT",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            const photoBody = await photoRes.json();

            if (!photoRes.ok) {
              throw new Error(photoBody.message);
            }
          }

          console.log(body.message);
          navigate("/");
        } catch (error) {
          console.error(error.message);
        }
      }}
    >
      <label htmlFor="authorComment">Comment:</label>
      <input
        id="authorComment"
        value={authorComment}
        onChange={(event) => {
          setAuthorComment(event.target.value);
        }}
      />

      <label htmlFor="hashtag">Hashtag:</label>
      <input
        id="hashtag"
        value={hashtag}
        onChange={(event) => {
          setHashtag(event.target.value);
        }}
      />

      <label htmlFor="photo">Photo :</label>
      <input id="photo" type="file" accept="image/*" ref={photoRef} />

      <button>Create post</button>
    </form>
  );
};

export default NewPostForm;
