import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import Cookies from "js-cookie";

const useCheckAuth = () => {
  const [loading, setLoading] = useState(true);
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setAuthState({
            isAuthenticated: false,
            isRefreshToken: false,
            user: null,
          });
          setLoading(false);
          return;
        }

        const response = await axios.get("/login/auth/status", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
