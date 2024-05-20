import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  ThemeProvider,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Colors } from "../utils/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginBg from "../images/LoginBackground.png";
import { theme } from "../utils/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../utils/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, username: null }));
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnackbar(false);
    }

    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (!username.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      hasErrors = true;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    axios
      .post("/login", { username, password })
      .then((res) => {
        if (res.data.success) {
          Cookies.set("token", res.data.token, { expires: 1 / 24 });
          const userRole = res.data.user.role;
          const userType = res.data.user.userType;

          if (userRole === "Admin") {
            navigate("/adminDashboard");
          } else if (userRole === "Teacher") {
            navigate("/staffDashboard");
          } else if (userType === "parent") {
            navigate("/parentDashboard");
          } else {
            navigate("/");
          }
        } else {
          setErrorMessage(res.data.message);
          setOpenSnackbar(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred", err);
        setOpenSnackbar(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage: `url(${LoginBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
        overflow={"hidden"}
        bgcolor={Colors.primary}
      >
        {errorMessage && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="login-mobile"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}
          noValidate
          autoComplete="off"
          width={"25%"}
          height={"60%"}
          gap={2}
          bgcolor={"rgba(255, 255, 255, 0.40)"}
          p={2}
          px={5}
          borderRadius={3}
          zIndex={10}
        >
          <Typography variant="h3" gutterBottom>
            Welcome Back!
          </Typography>
          <FormControl variant="outlined" fullWidth error={!!errors.username}>
            <InputLabel htmlFor="login_username" error={!!errors.username}>
              Username
            </InputLabel>
            <OutlinedInput
              placeholder="username"
              id="login_username"
              type={"text"}
              error={!!errors.username}
              value={username}
              onChange={handleUsername}
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlinedIcon
                    sx={{ color: `${Colors.cleanLightBlack} !important` }}
                  />
                </InputAdornment>
              }
              label="Username"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth error={!!errors.password}>
            <InputLabel htmlFor="login_password" error={!!errors.password}>
              Password
            </InputLabel>
            <OutlinedInput
              id="login_password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              placeholder="password"
              onChange={handlePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    disableRipple
                  >
                    {showPassword ? (
                      <VisibilityOffIcon
                        sx={{ color: `${Colors.cleanLightBlack} !important` }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{ color: `${Colors.cleanLightBlack} !important` }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon
                    sx={{ color: `${Colors.cleanLightBlack} !important` }}
                  />
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            color="white"
            type="submit"
            sx={{
              ":hover": {
                bgcolor: Colors.secondary,
              },
              marginTop: 2,
            }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
