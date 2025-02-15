import { Route, Routes } from 'react-router-dom';
import { AuthPage } from 'pages/AuthPage';
import Header from 'widgets/components/Header/Header';
import { Suspense, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { getError } from 'entities/Error';
import Error from 'shared/ui/Error';
import Modal from 'shared/ui/Modal/Modal';
import { errorActions } from 'entities/Error/model/slice/ErrorSlice';
import MainRouter from './MainRouter';
import ProtectedRoute from '../lib/ProtectedRoute';
import Sidebar from '../../../../widgets/components/Sidebar/Sidebar';
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
