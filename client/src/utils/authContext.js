import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    isRefreshToken: null,
    user: null,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/login/auth/status");
        setAuthState({
          isAuthenticated: response.data.isAuthenticated,
          isRefreshToken: response.data.isRefreshToken,
          user: response.data.user,
        });
        console.log(response);
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isRefreshToken: false,
          user: null,
        });
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
