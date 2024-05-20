import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";

const useCheckAuth = () => {
  const [loading, setLoading] = useState(true);
  const { authState, setAuthState } = useAuth();

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
  }, [setAuthState]);

  return { authState, loading };
};

export default useCheckAuth;
