import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Colors } from "../utils/colors";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../utils/authContext";
import useLogout from "../utils/useLogout";
import useCheckAuth from "../utils/useCheckAuth";
import { useEffect } from "react";
import "./Header.css";

const settings = ["Profile", "Account", "Dashboard"];

function ChatIcon() {
  return (
    <div className="chat-icon">
      <svg
        viewBox="0 -3 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
      >
        <path
          stroke="#0A0A30"
          strokeWidth="1.5"
          d="M10 6.75h4A4.25 4.25 0 0118.25 11v6.25H10A4.25 4.25 0 015.75 13v-2A4.25 4.25 0 0110 6.75z"
        />
        <circle cx="9" cy="12" r="1" fill="#265BFF" className="chat-dot" />
        <circle
          cx="12"
          cy="12"
          r="1"
          fill="#265BFF"
          className="chat-dot"
          style={{ animationDelay: "0.3s" }}
        />
        <circle
          cx="15"
          cy="12"
          r="1"
          fill="#265BFF"
          className="chat-dot"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>
    </div>
  );
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // useEffect(() => {
  //   if (!loading) {
  //     if (!authState.isAuthenticated && authState.isRefreshToken) {

  //     }
  //   }
  // }, [loading, authState, handleLogout]);

  const drawerList = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/activities"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Activities" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/fooddashboard"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Food" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/DashboardParents"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Staff" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/StaffDashboard"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="ContactFrom" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/ContactDashboard"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Meal" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/DashboardParents"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="AboutUs" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/AboutUs"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Parents" sx={{ textAlign: "center" }} />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/DashboardChildren"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="Children" sx={{ textAlign: "center" }} />
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: Colors.white, color: Colors.black }}
    >
      <Container maxWidth="2xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: { md: "space-between", xl: "space-between" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{ display: "flex", gap: "1rem" }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LET
              </Typography>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/AboutUs"
              sx={{
                mr: 2,
                mt: 0.5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              About us
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/ContactUs"
              sx={{
                mr: 2,
                mt: 0.5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Contact us
            </Typography>
          </Box>

          <Box
            sx={{ flexGrow: 0 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
          >
            <a href="/chat">
              <ChatIcon />
            </a>
            {authState.isAuthenticated && (
              <a
                href={
                  authState.user.role === "Teacher"
                    ? "/TeacherHome"
                    : authState.user.role === "Admin"
                    ? "/AdminHome"
                    : authState.user.role === "parent"
                    ? "/ParentHome"
                    : "#"
                }
                className="link-header"
              >
                Dashboard
              </a>
            )}

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{ sx: { width: "100%", maxWidth: "100%" } }}
          >
            <Box sx={{ p: 2 }}>
              <IconButton
                aria-label="close drawer"
                onClick={toggleDrawer(false)}
                sx={{ alignSelf: "flex-end", mb: 2 }}
              >
                <CloseIcon />
              </IconButton>
              {drawerList}
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
