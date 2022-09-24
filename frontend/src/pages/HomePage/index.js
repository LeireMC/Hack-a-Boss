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
    addComment,
    setPosts,
  } = usePosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main className="homePage">
        <MenuTrendingToppics setPosts={setPosts} />
        {loading && <Spinner />}
        {posts.length > 0 && (
          <section className="postListContainer">
            <PostsList posts={posts} addComment={addComment} />
          </section>
        )}

        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
