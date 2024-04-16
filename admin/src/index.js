import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import creatingStore from "./redux/createStore";
// import "./app.css";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./app";
// const store = creatingStore();
ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
