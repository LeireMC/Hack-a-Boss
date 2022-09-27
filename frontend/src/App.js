import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import { CustomTokenContextProvider } from "./context/TokenContext";
import NotFoundPage from "./pages/NotFoundPage";
/* import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import FollowingPage from "./pages/FollowingPage"; */

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <main>
          <Routes>
            {/*   <Route path="/login" element={<LoginPage />} /> */}
            {/*  <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/" element={<HomePage />} />
            {/*      <Route path="/post/:idPost" element={<PostPage />} /> */}
            <Route path="/post/new" element={<NewPostPage />} />
            <Route path="/profile/:idUser" element={<ProfilePage />} />
            {/*           <Route path="/editUserProfile" element={<EditUserProfilePage />} /> */}
            <Route path="/favorites" element={<FavoritesPage />} />
            {/*            <Route path="/following" element={<FollowingPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <ToastContainer position="bottom-center" />
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
