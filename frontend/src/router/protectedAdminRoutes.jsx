import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../provider/auth_provider";

const ProtectedAdminRoutes = () => {
    const { isAdmin } = useContext(AuthContext)

    return isAdmin ? <Outlet/> : <Navigate to="/unauthorized" />
}

export default ProtectedAdminRoutes;