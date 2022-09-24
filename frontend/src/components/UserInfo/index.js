import { Link } from "react-router-dom";

const UserInfo = ({ userInfo }) => {
  const { name, username, avatar, bio, url } = userInfo;

  return (
    <>
      <section className="userAvatar">
        <img
          className="userAvatar"
          alt={`Avatar de ${name}`}
          src={`${process.env.REACT_APP_API_URL}/avatar/${avatar}`}
        />
        <button>Seguir</button>
      </section>

      <section className="userInfo">
        <h3 className="name">{`${name}`}</h3>
        <h4 className="userName">{`${username}`}</h4>
        <h4 className="userBioTitle">Biografia</h4>
        <p className="userBio">{`${bio}`}</p>
        <Link className="userUrl" to={`${url}`}>
          url
        </Link>
      </section>
    </>
  );
};

export default UserInfo;
