import "./styles.css";
import { useState, useEffect } from "react";
import PhotoSlider from "../PhotoSlider";
import { toast } from "react-toastify";
import CloseButton from "../CloseButton";
import UserDefaultAvatar from "../UserDefaultAvatar";
import { useTokenContext } from "../../Contexts/TokenContext";
import { FavoritedIcon, UnfavoritedIcon } from "../FavoritesIcons";
import { LikedIcon, UnlikedIcon } from "../LikeIcons";
import {
  getLikeStatus,
  getPostnumLikes,
  getUserFavorites,
} from "../../services";
import { Link } from "react-router-dom";

const PostModal = ({ post, setOpenModal, setSelectPost, addComment }) => {
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
  const { token } = useTokenContext();

  console.log(post);

  const [newComment, setNewComment] = useState("");
  const [numLikes, setNumLikes] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [hashtagArray, setHashtagArray] = useState([]);

  useEffect(() => {
    const loadPostLikesandFavorited = async () => {
      try {
        const postNumLikes = await getPostnumLikes(idPost);

        const postIsLikedByUser = await getLikeStatus(idPost, token);

        const postIsFavoritedByUser = await getUserFavorites(token);

        const postIsFavorited = postIsFavoritedByUser.find((post) => {
          return post.idPost === idPost;
        });

        if (!postIsFavorited) {
          setIsFavorite(false);
        } else {
          setIsFavorite(true);
        }

        setNumLikes(postNumLikes);
        setIsLiked(postIsLikedByUser);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadPostLikesandFavorited();

    if (hashtag) {
      setHashtagArray(hashtag.replace(/\s+/g, "").split(","));
    }
  }, [hashtag, idPost, token]);

  console.log(numLikes);

  return (
    <>
      <button className="closeButton" onClick={() => setOpenModal(false)}>
        <CloseButton />
      </button>
      <section className="modalBackground">
        <article className="modalContainer">
          <section className="postSlider">
            <PhotoSlider
              photos={photos}
              username={username}
              setOpenModal={setOpenModal}
              setSelectPost={setSelectPost}
            />
            {token && (
              <section className="icons">
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
                      toast.error(error.message);
                    }
                  }}
                  className="bookmark"
                >
                  {isFavorite && <FavoritedIcon />}
                  {!isFavorite && <UnfavoritedIcon />}
                </button>
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
                      toast.error(error.message);
                    }
                  }}
                  className="heart"
                >
                  {isLiked && <LikedIcon />}
                  {!isLiked && <UnlikedIcon />}
                </button>
              </section>
            )}

            <section className="infoLikesFavorited">
              <p>
                Le han dado like
                <span className="numLikes"> {numLikes ? numLikes : 0} </span>
                personas.
              </p>
            </section>
          </section>

          <section className="postData">
            <section className="userInfo">
              <section className="userAvatar">
                {!avatar && <UserDefaultAvatar />}
                {avatar && (
                  <img
                    className="userAvatar"
                    alt={`Avatar de ${name}`}
                    src={`${process.env.REACT_APP_API_URL}/avatar/${avatar}`}
                  />
                )}
              </section>
              <section className="AuthorComment">
                <p className="authorName">
                  <Link to="/profile/:username">{name}</Link>
                  <span className="authorUsername">{` @${username}`}</span>
                </p>

                <p className="authorComment">{authorComment}</p>
                {hashtag && (
                  <p className="hashtag">
                    {hashtagArray.map((ht, index) => {
                      return <span key={index}>{`#${ht} `}</span>;
                    })}
                  </p>
                )}
              </section>
            </section>
            <p className="commentsTitle">Comentarios</p>
            <section className="usersComments">
              {comments &&
                comments.map((comment, index) => {
                  return (
                    <section key={index} className="userComment">
                      <section className="commentsAvatar">
                        {!comment.avatar && <UserDefaultAvatar />}
                        {comment.avatar && (
                          <img
                            className="commentAvatar"
                            alt={`Avatar de ${comment.name}`}
                            src={`${process.env.REACT_APP_API_URL}/avatar/${avatar}`}
                          />
                        )}
                      </section>
                      <section className="commentInfo">
                        <p className="commentUsername">{`@${comment.username}`}</p>
                        <p className="commentText">{comment.body}</p>
                      </section>
                    </section>
                  );
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
                        Authorization: token,
                      },
                      body: JSON.stringify({ body: newComment }),
                    }
                  );
                  const body = await res.json();

                  if (!res.ok) {
                    throw new Error(body.message);
                  }

                  addComment(idPost, body.data);
                  setNewComment("");

                  toast.success("Comentario añadido!");
                } catch (error) {
                  console.log(error.message);
                  toast.error(error.message);
                }
              }}
            >
              <textarea
                className="commentForm"
                value={newComment}
                placeholder="Escribe un comentario"
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
                required
              ></textarea>
              <button className="commentButton">Comentar</button>
            </form>
          </section>
        </article>
      </section>
    </>
  );
};

export default PostModal;
