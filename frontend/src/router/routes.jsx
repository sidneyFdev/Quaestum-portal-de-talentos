import { Route, Routes } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import ResetPassword from "../auth/resetpassword";
import Home from "../pages/home-candidate";
import ProtectedRoutes from "./protectedroutes";
import ProtectedAdminRoutes from "./protectedAdminRoutes";
import { useState } from "react";
import PublicRoute from "./publicroutes";

const AppRoutes = () => {



    return(
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/"  element={<Login />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/register"  element={<Register />} />
                <Route path="/resetpassword"  element={<ResetPassword />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;