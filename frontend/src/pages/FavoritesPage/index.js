/* import "./styles.css"; */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import usePosts from "../../hooks/usePost";
import FavoritesList from "../../components/FavoritesList/FavoritesList";
import { getUserFavorites } from "../../services";

const FavoritesPage = () => {
  const { setSearchParams, searchParams } = usePosts();
  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />

      <main>
        <FavoritesList getUserFavorites={getUserFavorites} />
      </main>
      <Footer />
    </>
  );
};

export default FavoritesPage;
