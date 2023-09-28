import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeSkeleton from 'pages/Home/ui/HomeSkeleton';
import BoardPageSkeleton from 'pages/BoardPage/ui/BoardPageSkeleton';

import BoardPage from '../../../../pages/BoardPage/ui/BoardPage';

import { Home } from '../../../../pages/Home';

const MainRouter = () => (
    <Routes>
        <Route
            path="/board/:boardId"
            element={(
                <Suspense fallback={<BoardPageSkeleton />}>
                    <BoardPage />
                </Suspense>
            )}
        />
        <Route
            index
            element={(
                <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                </Suspense>
            )}
        />

    </Routes>
);

export default MainRouter;
