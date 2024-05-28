// RoleBasedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const RoleBasedRoute = ({ children, allowedRoles, allowedSpecificRoles }) => {
  const { authState } = useAuth();

  if (authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (
    (!authState.isAuthenticated && !authState.isRefreshToken) ||
    (authState.isAuthenticated && !authState.isRefreshToken) ||
    !allowedRoles.includes(authState.user.userType) ||
    !allowedSpecificRoles.includes(authState.user.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoute;
