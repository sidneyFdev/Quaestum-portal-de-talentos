import React from "react";
import { BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import AppRoutes from "./router/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex h-full w-full overflow-hidden relative">
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
