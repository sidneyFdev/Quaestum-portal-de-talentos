import React, {act, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Header from './components/layout/header';
import SideBar from "./components/layout/sidebar";
import LoginAdmin from "./admin/login";
import Footer from "./components/layout/footer";
import ResetPassword from "./auth/resetpassword";

const App = () => {

  const [activeSideBar, setActiveSideBar] = useState(false)

  return (
    <BrowserRouter>
      <Header activeSideBar={activeSideBar} toggleActiveSideBar={() => setActiveSideBar((prev) => !prev)} />
      <div className="flex h-full w-full overflow-hidden">
            <div
              className={`
              transition-all duration-300 ease-in-out overflow-x-hidden
              ${activeSideBar ? 'w-64 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full'}
              overflow-y-auto
            `}
          >
              <SideBar />
            </div>
          
            <main className="flex flex-col flex-1 overflow-y-auto">
              <main className="flex-1">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<LoginAdmin />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              
            </Routes>
              </main>

              <Footer />
            </main>
        </div>
    </BrowserRouter>
  );
};

export default App;
