import { Route, Routes } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage';
import { Suspense, useMemo } from 'react';
import Error from 'shared/ui/Error';
import { Sidebar } from 'widgets/Sidebar';
import MainRouter from './MainRouter';
import ProtectedRoute from '../lib/ProtectedRoute';
import s from '../../../styles/App.module.scss';

const AppRouter = () => (

    <>
        <Routes>
            <Route
                path="/*"
                element={(
                    <ProtectedRoute>
                        <Suspense>
                            <div className={s.home}>
                                <Sidebar />
                                <div className={s.body}>
                                    <MainRouter />
                                </div>
                            </div>
                        </Suspense>
                    </ProtectedRoute>

                )}
            />
            <Route
                path="auth"
                element={(
                    <Suspense>
                        <AuthPage />
                    </Suspense>
                )}
            />
        </Routes>
        <Error />
    </>
);

export default AppRouter;
