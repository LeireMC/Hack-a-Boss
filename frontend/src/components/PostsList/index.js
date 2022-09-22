import "./styles.css";
import PostModal from "../PostModal";
import Post from "../Post";
import { Fragment, useState } from "react";

const PostsList = ({ posts, addComment, addLike }) => {
  const [openModal, setOpenModal] = useState(false);

  const [selectPost, setSelectPost] = useState([]);

  return posts.length ? (
    <ul className="postListPhotos">
      {posts.map((post, index) => {
        return (
          <Fragment key={index}>
            <li
              className="photoColumn"
              onClick={() => {
                setOpenModal(true);
                setSelectPost(post);
              }}
            >
              <Post
                post={post}
                setOpenModal={setOpenModal}
                setSelectPost={setSelectPost}
              />
            </li>
            <section className="modalWindow">
              {openModal && (
                <PostModal
                  setOpenModal={setOpenModal}
                  post={selectPost}
                  setSelectPost={setSelectPost}
                  addComment={addComment}
                  addLike={addLike}
                />
              )}
            </section>
          </Fragment>
        );
      })}
    </ul>
  ) : (
    <p>no hay posts todavia</p>
  );
};

export default PostsList;
