import "./styles.css";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import UserInfo from "../../components/UserInfo";
import UserPosts from "../../components/UserPosts";
import useUserById from "../../hooks/useUserById";

const ProfilePage = () => {
  const { searchParams, setSearchParams, addComment } = usePosts();
  const { idUser } = useParams();

  const { user } = useUserById(idUser);

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main className="profilePage">
        {user.length > 0 && (
          <>
            <section className="userInfoSection">
              <UserInfo userInfo={user[0]} />
            </section>
            <section>
              <UserPosts user={user} addComment={addComment} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
