import "./styles.css";
import logoHackaGram from "../../assets/images/logo.png";
import EditProfileForm from "../../components/EditProfileForm";
import { useTokenContext } from "../../Contexts/TokenContext";

const EditUserProfilePage = () => {
  const { token, loggedUser } = useTokenContext();
  return (
    <>
      <main>
        <img src={logoHackaGram} alt="Logo de Hack a Gram" />
        {loggedUser.length > 0 && (
          <EditProfileForm token={token} loggedUser={loggedUser} />
        )}
      </main>
    </>
  );
};

export default EditUserProfilePage;
