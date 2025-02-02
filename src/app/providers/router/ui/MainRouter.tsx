import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BoardPage } from 'pages/BoardPage';
import { Home } from '../../../../pages/Home';

const MainRouter = () => (
    <Routes>
        <Route
            path="/board/:boardId"
            element={(
                <BoardPage />
            )}
        />
        <Route
            index
            element={(
                <Home />
            )}
        />
    </Routes>
);

export default MainRouter;
