// RoleBasedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { authState } = useAuth();

  if (authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (
    !authState.isAuthenticated ||
    !allowedRoles.includes(authState.user.userType) ||
    !allowedRoles.includes(authState.user.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoute;
