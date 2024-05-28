// RoleBasedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import useCheckAuth from "./useCheckAuth";

const RoleBasedRoute = ({ children, allowedRoles, allowedSpecificRoles }) => {
const { authState,loading } = useAuth();

  console.log(
    (!authState.isAuthenticated && !authState.isRefreshToken) ||
      (authState.isAuthenticated && !authState.isRefreshToken) ||
      !allowedRoles.includes(authState.user.userType) ||
      !allowedSpecificRoles.includes(authState.user.role)
  );

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
