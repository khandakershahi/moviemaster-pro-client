import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading/Loading';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <Loading />
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to="/register"></Navigate>;
};

export default PrivateRoute;