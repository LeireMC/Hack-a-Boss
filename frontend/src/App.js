import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomTokenContextProvider } from "./context/TokenContext";

import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <header>
          <h1>Hack_a_Gram</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/new" element={<NewPostPage />} />
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
