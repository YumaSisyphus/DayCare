import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();

  if (authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
