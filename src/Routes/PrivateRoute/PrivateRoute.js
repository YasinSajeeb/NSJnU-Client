import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Redirect from './Redirect';
import Loading from '../../Pages/Shared/Loading/Loading';
import useUserStatus from '../../hooks/useUserStatus';

const PrivateRoute = ({children}) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isUserStatus, isUserStatusLoading] = useUserStatus(user?.email);

    if (authLoading || isUserStatusLoading) {
        return <Loading />;
    }

    if (user && isUserStatus) {
        return children;
    }
    
    return <Redirect />;
};

export default PrivateRoute;
