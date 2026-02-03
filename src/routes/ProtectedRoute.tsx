import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { tokenExpiredUtils } from '../utils/tokenExpiredUtils';
import Swal from 'sweetalert2';

interface ProtectedRouteProps {
    redirectTo?: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/login" }) => {

    const { isAuthenticated, token, logout} = useAuth();

    useEffect(() => {
        if(token && tokenExpiredUtils(token)) {
            handleSessionExpired();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleSessionExpired = () => {
        logout();

        Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
            icon: 'warning',
            confirmButtonText: 'Ir a la página de login',
            allowOutsideClick: false,
        }).then(() => {
            <Navigate to={redirectTo} replace />;
        });
    }

    if(!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;