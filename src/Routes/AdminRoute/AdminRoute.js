import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';
import useModerator from '../../hooks/useModerator';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const [isModerator, isModeratorLoading] = useModerator(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <Loading></Loading>
    }

    if (user && (isAdmin || isModerator)) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;