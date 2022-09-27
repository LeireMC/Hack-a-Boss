import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useFavoritedPosts from "../../hooks/useFavoritePosts";
import usePosts from "../../hooks/usePosts";
import Spinner from "../../components/Spinner";
import FavoritedPost from "../../components/FavoritedPost";

const FavoritesPage = () => {
  const { searchParams, setSearchParams, addComment, posts } = usePosts();
  const { favoritedPosts, loading, removeFavorite } = useFavoritedPosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main>
        {" "}
        {loading && <Spinner />}
        {favoritedPosts.length > 0 && posts.length > 0 && (
          <section className="favoritedPostListContainer">
            <FavoritedPost
              favoritedPosts={favoritedPosts}
              addComment={addComment}
              commentposts={posts}
              removeFavorite={removeFavorite}
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
