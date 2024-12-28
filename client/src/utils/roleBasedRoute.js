import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import SessionModal from "../components/SessionModal";
import useLogout from "./useLogout";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const RoleBasedRoute = ({ children, allowedRoles, allowedSpecificRoles }) => {
  const { authState, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const handleLogout = useLogout();

  useEffect(() => {
    if (!loading) {
      if (!authState.isAuthenticated && authState.isRefreshToken) {
        setModalOpen(true);
      } else if (!authState.isAuthenticated && !authState.isRefreshToken) {
        handleLogout();
      }
    }
  }, [loading, authState, handleLogout]);

  if (loading || authState.isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (
    !authState.isAuthenticated ||
    (authState.isRefreshToken && modalOpen) ||
    !authState.user ||
    !allowedRoles.includes(authState.user.userType) ||
    !allowedSpecificRoles.includes(authState.user.role)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <SessionModal open={modalOpen} />
      </ThemeProvider>
    );
  } else if (!authState.isRefreshToken) {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return children;
};

export default RoleBasedRoute;

// // RoleBasedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../utils/authContext";

// const RoleBasedRoute = ({ children, allowedRoles, allowedSpecificRoles }) => {
//   const { authState } = useAuth();

//   if (authState.isAuthenticated === null) {
//     return <div>Loading...</div>;
//   }
// console.log(authState.user.userType);
// console.log(authState.user.role);
// console.log(authState);

//   if (
//     (!authState.isAuthenticated && !authState.isRefreshToken) ||
//     (authState.isAuthenticated && !authState.isRefreshToken) ||
//     !allowedRoles.includes(authState.user.userType) ||
//     !allowedSpecificRoles.includes(authState.user.role)
//   ) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default RoleBasedRoute;
