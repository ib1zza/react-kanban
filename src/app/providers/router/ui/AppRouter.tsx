import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage';
import Header from 'widgets/components/Header/Header';
import MainRouter from './MainRouter';
import ProtectedRoute from '../lib/ProtectedRoute';
import Sidebar from '../../../../widgets/components/Sidebar/Sidebar';
import s from '../../../styles/App.module.scss';

const AppRouter = () => (
    <Routes>
        <Route
            path="/*"
            element={(

                <ProtectedRoute>
                    <div className={s.home}>
                        <Sidebar />
                        <div className={s.body}>

                            <Header />
                            <MainRouter />

                        </div>
                    </div>
                </ProtectedRoute>

            )}
        />

        <Route path="auth" element={<AuthPage />} />
    </Routes>
);

export default AppRouter;
