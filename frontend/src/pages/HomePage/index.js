import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import PostsList from "../../components/PostsList";
import MenuTrendingToppics from "../../components/MenuTrendingToppics";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const HomePage = () => {
  const {
    searchParams,
    setSearchParams,
    posts,
    loading,
    errorMessage,
    selectPost,
    setSelectPost,
    addComment,
    addLike,
  } = usePosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main className="homePage">
        <MenuTrendingToppics />
        {loading && <Spinner />}

        <section className="postListContainer">
          {posts.length > 0 && (
            <PostsList
              posts={posts}
              selectPost={selectPost}
              setSelectPost={setSelectPost}
              addComment={addComment}
              addLike={addLike}
            />
          )}
        </section>

        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
