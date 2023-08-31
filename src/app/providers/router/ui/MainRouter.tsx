import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeSkeleton from 'pages/Home/ui/HomeSkeleton';
import BoardPageSkeleton from 'pages/BoardPage/ui/BoardPageSkeleton';
import ProfileSkeleton from 'pages/Profile/ui/ProfileSkeleton';
import BoardPage from '../../../../pages/BoardPage/ui/BoardPage';
import { Profile } from '../../../../pages/Profile';
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
        <Route
            path="/profile"
            element={(
                <Suspense fallback={<ProfileSkeleton />}>
                    <Profile />
                </Suspense>
            )}
        />
    </Routes>
);

export default MainRouter;
