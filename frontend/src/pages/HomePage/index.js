import "./styles.css";
/* import Header from "../../components/Header"; */
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import usePosts from "../../hooks/usePosts";
import PostsList from "../../components/PostsList";
import MenuTrendingToppics from "../../components/MenuTrendingToppics";

const HomePage = () => {
  const { posts, loading, error } = usePosts();

  return (
    <>
      <Header />
      <main>
        <MenuTrendingToppics />
        {loading && <p>Cargando posts...</p>}
        {error && <p>{error}</p>}
        <section className="postListContainer">
          <PostsList posts={posts} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
