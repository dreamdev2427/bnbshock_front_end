import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

const ScrollToTop = React.lazy(() => import("./ScrollToTop"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function AppRoutes() {
  return (
    <div>
      <Router>
        <React.Suspense fallback={<>Loading</>}>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />}></Route>              
              <Route path="/home" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>      
              <Route path="/register" element={<Signup />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </ScrollToTop>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default AppRoutes;
