import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../app/services/authContext";

const PrivateRoute = ({ render, component: Component, ...rest }) => {
  const { isAutenticado } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAutenticado ? render(props) : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
