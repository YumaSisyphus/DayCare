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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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
      <Container maxWidth="xl">
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
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                flexDirection: "column",
              }}
            >
              {drawerList}
            </Menu> */}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Typography
              variant="h6"
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
            <a href={"/activities"} className="link-header">
              Activities
            </a>
            <a href={"/fooddashboard"} className="link-header">
              Food
            </a>
            <a href={"/DashboardParents"} className="link-header">
              Parents
            </a>
            <a href={"/DashboardChildren"} className="link-header">
              Children
            </a>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
