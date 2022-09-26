import "./styles.css";
import { useParams } from "react-router-dom";
import { useTokenContext } from "../../Contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import UserInfo from "../../components/UserInfo";
import UserPosts from "../../components/UserPosts";
import useUserById from "../../hooks/useUserById";
import AlertIcon from "../../components/AlertIcon";

const ProfilePage = () => {
  const { searchParams, setSearchParams, addComment, posts } = usePosts();
  const { idUser } = useParams();
  const { token } = useTokenContext();

  const { user } = useUserById(idUser);

  const navigate = useNavigate();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      {posts.length > 0 && user.length > 0 && (
        <main className="profilePage">
          {user.length > 0 && user[0].privacy === "public" && (
            <>
              <section className="userInfoContainer">
                <UserInfo userInfo={user[0]} token={token} />
              </section>
              <section>
                <UserPosts
                  user={user}
                  addComment={addComment}
                  commentposts={posts}
                />
              </section>
            </>
          )}
          {token && user.length > 0 && user[0].privacy === "private" && (
            <>
              <section className="userInfoContainer">
                <UserInfo userInfo={user[0]} token={token} />
              </section>
              <section>
                <UserPosts
                  user={user}
                  addComment={addComment}
                  commentposts={posts}
                />
              </section>
            </>
          )}
          {!token && user.length > 0 && user[0].privacy === "private" && (
            <section className="container">
              <section className="infoContainer">
                <AlertIcon />
                <p>No puedes visibilizar este perfil.</p>
                <p>¿Quieres verlo?</p>
                <button
                  className="goLogin"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Loguéate
                </button>
                <p>o</p>
                <button
                  className="goRegister"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Regístrate
                </button>
              </section>
            </section>
          )}
        </main>
      )}

      <Footer />
    </>
  );
};

export default ProfilePage;
