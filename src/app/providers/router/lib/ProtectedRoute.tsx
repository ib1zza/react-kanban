import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    // const { user } = useAppSelector(getUserState);
    if (!user) {
        console.log('access to protected route is denied');
        return <Navigate to="/auth" />;
    }
    return <div className="h-full">{children}</div>;
};

export default ProtectedRoute;
