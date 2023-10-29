import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardPage from '../../../../pages/BoardPage/ui/BoardPage';
import { Home } from '../../../../pages/Home';

const MainRouter = () => (
    <Routes>
        <Route
            path="/board/:boardId"
            element={(
                <Suspense fallback={<div />}>
                    <BoardPage />
                </Suspense>
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
