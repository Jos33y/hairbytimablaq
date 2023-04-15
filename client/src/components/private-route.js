import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/use-auth-status";
import Spinner from "./spinner";


const PrivateRoute = () => {

    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute
