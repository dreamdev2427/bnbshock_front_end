import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { useQueryParam } from "use-params-query";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { store } from "./store";
import { updateReferalAddress, cleanCurrentUser, setCurrentUserAction, setConteffiflag } from "./store/actions/auth.actions";
import AppRoutes from "./routes";
import "./assets/css/app.css";
import "./assets/css/style.scss";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-notifications/lib/notifications.css";

import smoothScrollPolyfill from "smoothscroll-polyfill";
import { BACKEND_URL } from "./config";
import isEmpty from "./validation/isEmpty";

smoothScrollPolyfill.polyfill();

if (!isEmpty(localStorage.getItem("jwtToken"))) {
  const decoded = jwt_decode(localStorage.getItem("jwtToken"));
  const currTime = Date.now() / 1000;
  if (decoded.app < currTime) {
    store.dispatch(cleanCurrentUser());
    localStorage.removeItem("jwtToken");
  }
  else {
    store.dispatch(setCurrentUserAction(decoded._doc));
  }
}

function Index() {
  const ref = useQueryParam("ref");
  const regexForWallet = /^(0x[a-fA-F0-9]{40})$/gm;
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref !== undefined) {
      let m;
      let correct = false;
      while ((m = regexForWallet.exec(ref)) !== null) {
        if (m.index === regexForWallet.lastIndex) {
          regexForWallet.lastIndex++;
        }
        if (m[0] === ref) {
          correct = true;
          dispatch(updateReferalAddress(ref));
        }
      }
      if (!correct) {
      }
    } else {
    }
  }, [ref]);

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
