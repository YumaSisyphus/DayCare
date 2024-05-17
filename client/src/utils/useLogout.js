import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./authContext"; // Adjust the path based on your file structure

const useLogout = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/login/logout");

      setAuthState({ isAuthenticated: false, user: null });

      Cookies.remove("token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};

export default useLogout;
