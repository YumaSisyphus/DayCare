// Import necessary modules
import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate
import { useAuth } from "./authContext"; // Import useAuth

// RoleBasedRoute component
const RoleBasedRoute = ({ children, allowedRoles, allowedSpecificRoles }) => {
  const { authState } = useAuth();

  if (authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const { userType, role } = authState.user;

  if (
    !authState.isAuthenticated ||
    !authState.isRefreshToken ||
    !allowedRoles.includes(userType) ||
    !allowedSpecificRoles.includes(role)
  ) {
    return <Navigate to="/" />; // Use Navigate component
  }

  return children;
};

export default RoleBasedRoute;
