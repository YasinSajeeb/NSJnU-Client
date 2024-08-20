import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useModerator from '../../hooks/useModerator';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Pages/Shared/Loading/Loading';

const ModeratorRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isModerator, isModeratorLoading] = useModerator(user?.email);
    const location = useLocation();

    if (loading || isModeratorLoading) {
        return <Loading></Loading>
    }

    if (user && isModerator) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ModeratorRoute;