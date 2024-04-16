import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";
import { getUserAsync } from "./utils/ApiManager";

var user = localStorage.getItem("user");
user = JSON.parse(user);
const App = ({}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    getUserAsync().then((user) => {
      if (user?.success) {
        setLoading(false);
        setUser(user.user);
        var u = localStorage.getItem("user");
        u = JSON.parse(u);
        localStorage.setItem("user", JSON.stringify({ ...u, ...user.user }));
      } else {
        setLoading(false);
      }
    });
  };
  return (
    <BrowserRouter>
      {loading ? null : (
        <Switch>
          {user && (
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
          )}
          {!user && (
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          )}
          <Redirect
            from="/"
            to={user ? "/admin/vehicle-types" : "/auth/login"}
          />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
