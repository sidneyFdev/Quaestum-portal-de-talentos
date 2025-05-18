import { Outlet, Navigate } from "react-router-dom";

const ProtectedAdminRoutes = () => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("is_admin") === "true"
  
    if (!token) return <Navigate to="/login" />
    if (!isAdmin) return <Navigate to="/unauthorized" />

    return <Outlet />
}

export default ProtectedAdminRoutes;