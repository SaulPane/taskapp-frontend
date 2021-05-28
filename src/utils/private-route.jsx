import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children, ...props }) {
  const { logged } = useAuth();
  return (
    <Route {...props}>{logged ? children : <Redirect to="/login" />}</Route>
  );
}

export default PrivateRoute;
