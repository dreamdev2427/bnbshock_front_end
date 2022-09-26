import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { NotificationContainer } from "react-notifications";
import { useQueryParam } from "use-params-query";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { store } from "./store";
import { updateReferalAddress, cleanCurrentUser, setCurrentUserAction } from "./store/actions/auth.actions";
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

  const setCurrentUserInfoById = (userId) =>{ 
    let filter = userId ? '/'+userId : '';
    axios.get(`${BACKEND_URL}/api/user/${filter}`, {}, {
    headers: {
      "Authorization": "Bearer "+localStorage.getItem("jwtToken") , // <- Don't forget Authorization header if you are using it.
    }
    })
    .then(function (response) {
      store.dispatch(setCurrentUserAction(response.data));
    })
    .catch(function (error) {
      console.log(error);
    })
  }  

  if(!isEmpty(localStorage.getItem("jwtToken")))
  {
    const decoded = jwt_decode(localStorage.getItem("jwtToken"));
    const currTime = Date.now() / 1000;
    if(decoded.app < currTime)
    {
      store.dispatch(cleanCurrentUser());
      localStorage.removeItem("jwtToken");
    }
    else{   
      setCurrentUserInfoById(decoded.id);
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
