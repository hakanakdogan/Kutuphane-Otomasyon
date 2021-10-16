import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isLogged,user } = loginReducer;
  return (
    <Route
      {...rest}
      render={(props) =>
        !(isLogged) ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
