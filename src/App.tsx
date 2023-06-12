import "./App.scss";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
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
