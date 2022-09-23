import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./context/TokenContext";
/* import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import PostPage from "./pages/PostPage"; */
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
/* import ProfilePage from "./pages/ProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import FollowingPage from "./pages/FollowingPage"; */

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <header>
          <h1>Hack_a_Gram</h1>
        </header>

        <main>
          <Routes>
            {/*           <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/" element={<HomePage />} />
            {/*  <Route path="/post/:idPost" element={<PostPage />} /> */}
            <Route path="/post/new" element={<NewPostPage />} />
            {/*  <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editUserProfile" element={<EditUserProfilePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/following" element={<FollowingPage />} /> */}
          </Routes>
        </main>

        <ToastContainer position="bottom-center" />

        <footer>
          <p>Hack_a_Gram 2022</p>
        </footer>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
