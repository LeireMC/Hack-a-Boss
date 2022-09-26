import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import decodedTokenInfo from "../../utils/decodedTokenInfo";
import { getFollowUsers } from "../../services";
import Avatar from "../Avatar";

const UserInfo = ({ userInfo, token }) => {
  const [follow, setFollow] = useState("");
  const { name, username, avatar, bio, url, id, lastname } = userInfo;
  const idLoggedUser = decodedTokenInfo(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const loadFollower = async () => {
        try {
          const followUsers = await getFollowUsers(token);

          if (!followUsers.data) {
            setFollow(false);
          } else {
            const isFollowUser = followUsers.data.filter((user) => {
              return user.id === id;
            });

            if (isFollowUser.length > 0) {
              setFollow(true);
            } else {
              setFollow(false);
            }
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      loadFollower();
    }
  }, [token, id]);

  return (
    <>
      <section className="userProfileAvatar">
        <figure className="avatarImage">
          <Avatar avatar={avatar} name={name} />
        </figure>

        {token && idLoggedUser !== id && (
          <button
            className="profileButton"
            onClick={async (e) => {
              try {
                e.preventDefault();
                const res = await fetch(
                  `${process.env.REACT_APP_API_URL}/user/${id}/follower`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: token,
                    },
                  }
                );
                const body = await res.json();

                if (!res.ok) {
                  throw new Error(body.message);
                }

                setFollow(!follow);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {follow && "Dejar de seguir"}
            {!follow && "Seguir"}
          </button>
        )}
        {token && idLoggedUser === id && (
          <button
            className="profileButton"
            type="button"
            onClick={() => {
              navigate("/editUserProfile");
            }}
          >
            Editar Perfil
          </button>
        )}
      </section>

      <section className="userProfileInfo">
        <h3 className="name">{`${name} ${
          lastname !== null ? lastname : ""
        }`}</h3>

        <h4 className="userName">{`@${username}`}</h4>
        <h4 className="userBioTitle">Biografia</h4>
        <p className="userBio">{`${bio}`}</p>
        <a className="userUrl" href={`http://${url}`}>
          {`${url}`}
        </a>
      </section>
    </>
  );
};

export default UserInfo;
