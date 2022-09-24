import "./styles.css";
import { useState, useEffect } from "react";
import PhotoSlider from "../PhotoSlider";
import { toast } from "react-toastify";
import CloseButton from "../CloseButton";
import { useTokenContext } from "../../Contexts/TokenContext";
import {
  getLikeStatus,
  getPostnumLikes,
  getUserFavorites,
} from "../../services";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import FavoriteButton from "../FavoriteButton";
import Avatar from "../Avatar";
import PostComments from "../PostComments";

const PostModal = ({ post, setOpenModal, setSelectPost, addComment }) => {
  const {
    authorComment,
    avatar,
    comments,
    hashtag,
    name,
    lastname,
    photos,
    idPost,
    username,
    idUser,
  } = post;
  const { token } = useTokenContext();

  console.log(post);

  const [newComment, setNewComment] = useState("");
  const [numLikes, setNumLikes] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [hashtagArray, setHashtagArray] = useState([]);

  useEffect(() => {
    if (token) {
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
    }

    if (hashtag) {
      setHashtagArray(hashtag.replace(/\s+/g, "").split(","));
    }
  }, [hashtag, idPost, token]);

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
                <FavoriteButton
                  idPost={idPost}
                  token={token}
                  setIsFavorite={setIsFavorite}
                  isFavorite={isFavorite}
                />
                <LikeButton
                  idPost={idPost}
                  token={token}
                  setNumLikes={setNumLikes}
                  setIsLiked={setIsLiked}
                  isLiked={isLiked}
                />
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
              <figure className="userAvatar">
                <Avatar avatar={avatar} name={name} />
              </figure>
              <section className="AuthorComment">
                <p className="authorName">
                  <Link to={`/profile/${idUser}`}>
                    {name} {lastname}
                  </Link>
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
                      <PostComments comment={comment} />
                    </section>
                  );
                })}
            </section>
            {token && (
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
                  } catch (error) {
                    console.log(error.message);
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
            )}
          </section>
        </article>
      </section>
    </>
  );
};

export default PostModal;
