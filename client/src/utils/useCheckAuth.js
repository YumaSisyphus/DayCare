import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import Cookies from "js-cookie";

const useCheckAuth = () => {
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
          return;
        }

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
      }
    };

    checkAuthStatus();
  }, [setAuthState]);

  return { authState };
};

export default useCheckAuth;
