import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import { store } from "./store";
import AppRoutes from "./routes";
import "./assets/css/app.css";
import "./assets/css/style.scss";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-notifications/lib/notifications.css";

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
      <NotificationContainer />
    </div>
  );
}
export default Index;

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById("root")
);
