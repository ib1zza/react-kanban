import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import Header from "./components/Header/Header";
import BoardPage from "./pages/BoardPage/BoardPage";
import Profile from "./pages/Profile";
import s from "./App.module.scss";
function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className={s.home}>
                <Header />
                <div className={s.body}>
                  <Routes>
                    <Route path="/board/:boardId" element={<BoardPage />} />
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
