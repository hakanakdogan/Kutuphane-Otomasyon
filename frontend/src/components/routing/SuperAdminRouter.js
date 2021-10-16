import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperAdminRoute = ({ component: Component, ...rest }) => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isLogged, user } = loginReducer;
  return (
    <Route
      {...rest}
      render={(props) =>
        !(isLogged || user.admin===2) ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default SuperAdminRoute;
