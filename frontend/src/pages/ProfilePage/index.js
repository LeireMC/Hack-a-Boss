import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import UserProfile from "../../components/UserProfile";

const ProfilePage = () => {
  const {
    searchParams,
    setSearchParams,
    posts,
    loading,
    errorMessage,
    selectPost,
    setSelectPost,
    addComment,
    setPosts,
  } = usePosts();
  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main classNmae="profilePage">
        <UserProfile />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
