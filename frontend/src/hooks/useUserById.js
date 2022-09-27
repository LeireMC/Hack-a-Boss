import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByIdService } from "../services";

const useUserById = (idUser) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserByIdService(navigate, idUser);

        setUser(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadUser();
  }, [idUser, navigate]);

  return { user };
};

export default useUserById;
