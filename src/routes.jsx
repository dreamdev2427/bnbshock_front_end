import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ScrollToTop = React.lazy(() => import("./ScrollToTop"));
const Home = React.lazy(() => import("./pages/Home"));
const Deposit = React.lazy(() => import("./pages/Deposit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function AppRoutes() {
  return (
    <div>
      <Router>
        <React.Suspense fallback={<>Loading</>}>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/deposit" element={<Deposit />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </ScrollToTop>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default AppRoutes;
