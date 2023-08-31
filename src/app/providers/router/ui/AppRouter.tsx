import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage';
import MainRouter from './MainRouter';
import ProtectedRoute from '../lib/ProtectedRoute';
import Header from '../../../../widgets/components/Header/Header';
import s from '../../../styles/App.module.scss';

const AppRouter = () => (
    <Suspense>
        <Routes>
            <Route
                path="/*"
                element={(

                    <ProtectedRoute>
                        <div className={s.home}>
                            <Header />
                            <div className={s.body}>
                                <MainRouter />
                            </div>
                        </div>
                    </ProtectedRoute>

                )}
            />

            <Route path="auth" element={<AuthPage />} />

        </Routes>
    </Suspense>
);

export default AppRouter;
