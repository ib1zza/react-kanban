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

const AppRouter = () => {
    const error = useAppSelector(getError);
    const dispatch = useAppDispatch();
    const handleCloseErrorModal = () => {
        dispatch(errorActions.clearError());
    };

    const children = useMemo(() => (
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
            <Route
                path="auth"
                element={(
                    <Suspense>
                        <AuthPage />
                    </Suspense>
                )}
            />
        </Routes>
    ), []);
    return (

        <>
            {children}
            {error && (
                <Modal onClose={handleCloseErrorModal}>
                    <Error onConfirm={handleCloseErrorModal} text={error} />
                </Modal>
            )}
        </>
    );
};

export default AppRouter;
