import "./styles.css";
import logoHackaGram from "../../assets/images/logo.png";
import EditProfileForm from "../../components/EditProfileForm";

const EditUserProfilePage = () => {
  return (
    <>
      <main>
        <img src={logoHackaGram} alt="Logo de Hack a Gram" />
        <EditProfileForm />
      </main>
    </>
  );
};

export default EditUserProfilePage;
