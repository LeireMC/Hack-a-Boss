import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import { useEffect, useState } from "react";
import { getFollowUsers } from "../../services";
import { useTokenContext } from "../../Contexts/TokenContext";
import FollowingUserList from "../../components/FollowingUserList";
import AlertIcon from "../../components/AlertIcon";

const FollowingPage = () => {
  const { searchParams, setSearchParams } = usePosts();
  const [followingUsers, setFollowingUsers] = useState([]);

  const { token } = useTokenContext();

  useEffect(() => {
    const loadFollowingUser = async () => {
      try {
        const followingList = await getFollowUsers(token);

        followingList.data && setFollowingUsers(followingList.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadFollowingUser();
  }, [token]);

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main>
        {followingUsers.length > 0 ? (
          <section className="followingUserListContainer">
            <FollowingUserList followingUsers={followingUsers} token={token} />
          </section>
        ) : (
          <section className="container">
            <AlertIcon />
            <p>Aún no sigues a ningún usuario</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default FollowingPage;
