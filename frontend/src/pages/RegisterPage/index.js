import NewUserForm from "../../components/RegisterForm";
import logoHackaGram from "../../assets/images/logo.png";
import "./styles.css";

const RegisterPage = () => {
  return (
    <main className="registerUserMain">
      <section className="registerUserFormContainer">
        <img src={logoHackaGram} alt="Logo de Hack a Gram" />
        <h1>¡Bienvenid@!</h1>
        <p>
          Completa tu registro para formar parte de la comunidad Hack a Gram
        </p>
        <NewUserForm />
      </section>
    </main>
  );
};

export default RegisterPage;
