import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'app/providers/authRouter/ui/AuthContext';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    // const { user } = useAppSelector(getUserState);
    if (!user) {
        console.log('access to protected route is denied');
        return <Navigate to="/auth" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
