import "./styles.css";
import { useState } from "react";
import PhotoSlider from "../PhotoSlider";
import { toast } from "react-toastify";

const PostModal = ({ post, setOpenModal }) => {
  const {
    authorComment,
    avatar,
    comments,
    hashtag,
    name,
    photos,
    idPost,
    username,
  } = post;

  const [userComment, setUserComment] = useState("");

  console.log(userComment);
  return (
    <section className="modalBackground">
      <article className="modalContainer">
        <button onClick={() => setOpenModal(false)}>X</button>
        <PhotoSlider
          photos={photos}
          username={username}
          setOpenModal={setOpenModal}
        />
        <section className="postData">
          <section className="userInfo">
            {avatar && (
              <img
                className="userAvatar"
                alt={`Avatar de ${name}`}
                src={`${process.env.REACT_APP_API_URL}/avatar/${avatar}`}
              />
            )}
            <p className="name">{name}</p>
            <p className="username">{`@${username}`}</p>
          </section>
          <section className="AuthorComent">
            <p className="authorComment">{authorComment}</p>
            <p className="hashtag">{hashtag}</p>
          </section>
          <section className="UsersComments">
            {comments.map((comment, index) => {
              return <p className="userComment">{comment.body}</p>;
            })}
          </section>
          <form
            onSubmit={async (event) => {
              try {
                event.preventDefault();
                const res = await fetch(
                  `${process.env.REACT_APP_API_URL}/comments/new/${idPost}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ body: userComment }),
                  }
                );
                const body = await res.json();

                if (!res.ok) {
                  throw new Error(body.message);
                }
                toast.success("Comentario añadido!");
              } catch (error) {
                console.log(error.message);
                toast.error(error.message);
              }
            }}
          >
            <textarea
              value={userComment}
              onChange={(event) => {
                setUserComment(event.target.value);
              }}
            ></textarea>
            <button>Comentar</button>
          </form>
        </section>
      </article>
    </section>
  );
};

export default PostModal;
