import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    isRefreshToken: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/login/auth/status");
        setAuthState({
          isAuthenticated: response.data.isAuthenticated,
          isRefreshToken: response.data.isRefreshToken,
          user: response.data.user,
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isRefreshToken: false,
          user: null,
        });
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
