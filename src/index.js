import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { NotificationContainer } from "react-notifications";
import { useQueryParam } from "use-params-query";
import { store } from "./store";
import { updateReferalAddress } from "./store/actions/auth.actions";
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
