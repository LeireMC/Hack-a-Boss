import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import PostsList from "../../components/PostsList";
import MenuTrendingToppics from "../../components/MenuTrendingToppics";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

const HomePage = () => {
  const { posts, loading, errorMessage } = usePosts();

  return (
    <>
      <Header />
      <main className="homePage">
        <MenuTrendingToppics />
        {loading && <Spinner />}

        <section className="postListContainer">
          {posts.length > 0 && <PostsList posts={posts} />}
        </section>

        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
