import "./styles.css";
import PostModal from "../PostModal";
import Post from "../Post";
import { useState } from "react";

const PostsList = ({ posts }) => {
  const [openModal, setOpenModal] = useState(false);

  const [selectPost, setSelectPost] = useState([]);
  return posts.length ? (
    <ul className="postListPhotos">
      {posts.map((post, index) => {
        return (
          <>
            <li
              key={index}
              className="photoColumn"
              onClick={() => {
                setOpenModal(true);
                setSelectPost(post);
              }}
            >
              <Post post={post} setOpenModal={setOpenModal} />
            </li>
            <section className="modalWindow">
              {openModal && (
                <PostModal setOpenModal={setOpenModal} post={selectPost} />
              )}
            </section>
          </>
        );
      })}
    </ul>
  ) : (
    <p>no hay posts todavia</p>
  );
};

export default PostsList;
