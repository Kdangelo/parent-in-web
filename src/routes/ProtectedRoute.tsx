import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    redirectTo?: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/login" }) => {

    const { isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;