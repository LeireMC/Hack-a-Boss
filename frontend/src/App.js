import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import FollowingPage from "./pages/FollowingPage";
import { CustomTokenContextProvider } from "./Contexts/TokenContext";

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:idPost" element={<PostPage />} />
          <Route path="/post/new" element={<NewPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editUserProfile" element={<EditUserProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/following" element={<FollowingPage />} />
        </Routes>
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
