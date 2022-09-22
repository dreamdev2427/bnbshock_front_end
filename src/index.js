import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./routes";
import "./assets/css/app.css";
import "./assets/css/style.scss";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

import smoothScrollPolyfill from "smoothscroll-polyfill";

smoothScrollPolyfill.polyfill();

function Index() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
}
export default Index;

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
