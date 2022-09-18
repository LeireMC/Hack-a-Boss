import "./styles.css";
/* import Header from "../../components/Header"; */
import Footer from "../../components/Footer";
import Cabecera from "../../components/Cabecera";
import usePosts from "../../hooks/usePosts";
import PostsList from "../../components/PostsList";

const HomePage = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>{error}</p>;

  console.log(posts);

  return (
    <>
      {/* <Header /> */}
      <Cabecera />
      <main>
        <section className="menuTrendingToppic">
          <button>Aventura</button>
          <button>Naturaleza</button>
          <button>Comida</button>
          <button>Deportes</button>
          <button>Viajes</button>
        </section>
        <section className="postListContainer">
          <PostsList posts={posts} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
