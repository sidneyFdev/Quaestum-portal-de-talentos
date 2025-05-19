import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ResetPassword from "../pages/auth/resetpassword";
import Home from "../pages/candidate/home";
import ProtectedRoutes from "./protectedroutes";
import ProtectedAdminRoutes from "./protectedAdminRoutes";
import PublicRoute from "./publicroutes";
import RecruiterHome from "../pages/recruiter/home";
import ConfirmAccount from "../pages/auth/confirm";
import CreateNewPassword from "../pages/auth/createPassword";

const AppRoutes = () => {
    return(
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/"  element={<Login />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/register"  element={<Register />} />
                <Route path="/resetpassword"  element={<ResetPassword />} />
                <Route path="/confirm/:token" element={<ConfirmAccount />} />
                <Route path="/reset/:token" element={<CreateNewPassword />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route element={<ProtectedAdminRoutes />}>
                    <Route path="/recruiter" element={<RecruiterHome />} />
                </Route>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;