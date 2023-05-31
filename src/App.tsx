import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
