import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

//Se crea contexto para que el token sea accesible globalmente con createContext
export const TokenContext = createContext();
//Creamos componente que se encarga de dar el valor del contexto al children, que lo recojemos por props
export const CustomTokenContextProvider = ({ children }) => {
  //creamos estado para el token
  const [token, setToken] = useLocalStorage("token");
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    if (!token) {
      setLoggedUser({});
      return;
    }

    const fetchUser = async () => {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        console.log(process.env.REACT_APP_API_URL);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${decodedToken.id}`
        );

        const body = await res.json();
        console.log(body);
        if (!res.ok) {
          throw new Error(body.message);
        }

        setLoggedUser(body.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [token]);
  //retornamos provider para repartir el valor, en este caso a children, que será toda la aplicación
  return (
    <TokenContext.Provider
      //enviamos lo que queremos que sea global
      value={{ token, setToken, loggedUser, setLoggedUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
