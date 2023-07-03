import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "../../../../pages/BoardPage/ui/BoardPage";
import { Profile } from "../../../../pages/Profile";
import { Home } from "../../../../pages/Home";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/board/:boardId" element={<BoardPage />} />
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default MainRouter;
