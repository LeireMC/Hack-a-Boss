import "./styles.css";
import { useParams } from "react-router-dom";
import { useTokenContext } from "../../Contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserInfo from "../../components/UserInfo";
import UserPosts from "../../components/UserPosts";
import useUserById from "../../hooks/useUserById";
import AlertIcon from "../../components/AlertIcon";

const ProfilePage = () => {
  const { idUser } = useParams();
  const { token } = useTokenContext();

  const { searchParams, setSearchParams, userPosts, addComment } =
    useUserById(idUser);

  const navigate = useNavigate();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />

      {userPosts.length > 0 && (
        <main className="profilePage">
          {userPosts.length > 0 && userPosts[0].privacy === "public" && (
            <>
              <section className="userInfoContainer">
                <UserInfo userInfo={userPosts[0]} token={token} />
              </section>
              <section>
                <UserPosts userPosts={userPosts} addComment={addComment} />
              </section>
            </>
          )}
          {token && userPosts.length > 0 && userPosts[0].privacy === "private" && (
            <>
              <section className="userInfoContainer">
                <UserInfo userInfo={userPosts[0]} token={token} />
              </section>
              <section>
                <UserPosts userPosts={userPosts} addComment={addComment} />
              </section>
            </>
          )}
          {!token &&
            userPosts.length > 0 &&
            userPosts[0].privacy === "private" && (
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
