import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateroute";
import CandidateHome from '../pages/home-candidate';
import Login from "../auth/login";
import Register from "../auth/register";
import LoginAdmin from "../admin/login";
import ResetPassword from "../auth/resetpassword";
import RecruiterHome from "../admin/home";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/recruiter/candidates" element={<RecruiterHome />} />
            <Route
                path="/candidate"
                element={
                    <PrivateRoute>
                        <CandidateHome/>
                    </PrivateRoute>
                }
            />
            {/* <Route path="/candidate" element={<CandidateHome />}/> */}
        </Routes>
    )
}

export default AppRoutes;