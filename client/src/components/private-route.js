import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/use-auth-status";
import HomeSpinner from "../admin/dashboard/components/home-spinner";


const PrivateRoute = () => {

    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <HomeSpinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute
