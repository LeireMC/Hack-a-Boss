import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import PostsList from "../../components/PostsList";
import MenuTrendingToppics from "../../components/MenuTrendingToppics";
import Spinner from "../../components/Spinner";
import AlertIcon from "../../components/AlertIcon";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    searchParams,
    setSearchParams,
    posts,
    loading,

    addComment,
    setPosts,
  } = usePosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main className="homePage">
        <MenuTrendingToppics
          setPosts={setPosts}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        {loading && <Spinner />}
        {posts.length > 0 ? (
          <section className="postListContainer">
            <PostsList posts={posts} addComment={addComment} />
          </section>
        ) : (
          <section className="container">
            <AlertIcon />
            <p>No hay post relacionados con este término</p>
            <Link to="/">Volver al inicio</Link>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
