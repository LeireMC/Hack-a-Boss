/* import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/favorites`);

        if (res.ok) {
          const body = await res.json();
          console.log(body);
          setFavorites(body.value);
        } else {
          throw new Error("There was an error fetching the API");
        }
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { favorites, loading, errorMessage };
};

export default useFavorites; */
