import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainRouter from "./MainRouter";
import ProtectedRoute from "../lib/ProtectedRoute";
import Header from "../../../../shared/ui/Header/Header";
import s from "./../../../styles/App.module.scss";
import { Login } from "../../../../pages/Login";
import { SignUp } from "../../../../pages/SignUp";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className={s.home}>
                <Header />
                <div className={s.body}>
                  <MainRouter />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
