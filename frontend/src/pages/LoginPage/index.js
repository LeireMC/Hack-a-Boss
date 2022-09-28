import "./styles.css";
import LoginForm from "../../components/LoginForm";
import logoHackaGram from "../../assets/images/logo.png";
const LoginPage = () => {
  return (
    <main class="loginForm">
      <img class="logo" src={logoHackaGram} alt="Logo de Hack a Gram" />
      <LoginForm />
      <p>¿No tienes cuenta en Hack a Gram?</p>
      <a href="http://localhost:3000/register">Regístrate</a>
      <p>O echa un vistazo como invitado</p>
      <a href="http://localhost:3000/">Entrar a Hack a Gram</a>
    </main>
  );
};

export default LoginPage;
