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
import AppRoutes from "./router/routes";

const App = () => {

  const [activeSideBar, setActiveSideBar] = useState(false)

  return (
    <BrowserRouter>
      <Header activeSideBar={activeSideBar} toggleActiveSideBar={() => setActiveSideBar((prev) => !prev)} />
      <div className="flex h-full w-full overflow-hidden relative">
            <div
              className={`
              transition-all duration-300 ease-in-out overflow-x-hidden absolute sm:relative sm:block h-full z-20 border-r-1 border-(--basic-border-color)
              ${activeSideBar ? ' w-full opacity-100 translate-x-0 sm:w-64' : 'w-0 opacity-0 -translate-x-full'}
              overflow-y-auto
              `}
            >
              <SideBar />
            </div>
          
            <main className="flex flex-col flex-1 overflow-y-auto">
              <div className="flex-1">
                <AppRoutes />
              </div>

              <Footer />
            </main>
        </div>
    </BrowserRouter>
  );
};

export default App;
