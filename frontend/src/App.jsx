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

const App = () => {

  const [activeSideBar, setActiveSideBar] = useState(false)

  return (
    <BrowserRouter>
      <Header activeSideBar={activeSideBar} toggleActiveSideBar={() => setActiveSideBar((prev) => !prev)} />
        <div className="flex h-full w-full overflow-hidden">
          {activeSideBar && (
            <div className="w-64 overflow-y-auto h-full">
              <SideBar />
            </div>)
          }
            <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<LoginAdmin />} />
            </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
};

export default App;
