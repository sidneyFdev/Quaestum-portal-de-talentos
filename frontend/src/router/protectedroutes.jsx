import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../provider/auth_provider";

const ProtectedRoutes = () => {
    const { token, isAdmin } = useContext(AuthContext)

    if (!token){
        return <Navigate to="/login" replace />
    }

    if (isAdmin && location.pathname === '/home') {
        return <Navigate to="/recruiter" replace />
    }

    return <Outlet />
}

export default ProtectedRoutes;