import "./styles.css";

const MenuTrendingToppics = ({ setPosts }) => {
  const handleClickInMenuOptions = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target.value);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts?search=${e.target.value}`
      );

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message);
      }
      setPosts(body.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <section className="menuTrendingToppic">
      <button type="button" value="aventura" onClick={handleClickInMenuOptions}>
        Aventura
      </button>
      <button
        type="button"
        value="naturaleza"
        onClick={handleClickInMenuOptions}
      >
        Naturaleza
      </button>
      <button type="button" value="comida" onClick={handleClickInMenuOptions}>
        Comida
      </button>
      <button type="button" value="deportes" onClick={handleClickInMenuOptions}>
        Deportes
      </button>
      <button type="button" value="viajes" onClick={handleClickInMenuOptions}>
        Viajes
      </button>
      <button type="button" value="coches" onClick={handleClickInMenuOptions}>
        Coches
      </button>
    </section>
  );
};

export default MenuTrendingToppics;
