import { useState, useEffect } from "react";
import { useTokenContext } from "../Contexts/TokenContext";

const useUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const data = await getUserInfoService(username, token);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
  }, []);
};

export default useUser;
