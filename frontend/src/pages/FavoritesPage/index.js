import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useFavoritedPosts from "../../hooks/useFavoritePosts";
import Spinner from "../../components/Spinner";
import FavoritedPost from "../../components/FavoritedPost";

const FavoritesPage = () => {
  const {
    searchParams,
    setSearchParams,
    favoritedPosts,
    loading,
    addComment,
    removeFavorite,
  } = useFavoritedPosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main>
        {loading && <Spinner />}
        {favoritedPosts.length > 0 && (
          <section className="favoritedPostListContainer">
            <h3>Mis Favoritos</h3>
            <FavoritedPost
              favoritedPosts={favoritedPosts}
              addComment={addComment}
              removeFavorite={removeFavorite}
              searchParams={searchParams}
            />
          </section>
        )}
        {favoritedPosts.length === 0 && <p>Aun no tienes favoritos</p>}
      </main>
      <Footer />
    </>
  );
};

export default FavoritesPage;
