import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const ParentsList = () => {
  const [parents, setParents] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/parents/getParents");
        setParents(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParents();
  }, []);

  const handleDeleteParent = async (parentId) => {
    try {
      await axios.delete(`http://localhost:5000/parents/deleteParent/${parentId}`);
      setParents((prevParents) => prevParents.filter((parent) => parent.ParentId !== parentId));
    } catch (error) {
      console.error("Error deleting parent:", error.message);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");

    navigate("/login");
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: "#FFDAB9"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 , color:"#333333"}}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color:"#333333"}}>
            Dashboard
          </Typography>
          <Button color="inherit"  onClick={handleLogout} sx={{ color: "black" }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Welcome page" />
          </ListItem>
          <ListItem button onClick={() => navigate("/DashboardParents")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Parents" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar />
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}> {}
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parents.length > 0 ? (
                parents.map((parent) => (
                  <TableRow key={parent.ParentId}>
                    <TableCell>{parent.Name}</TableCell>
                    <TableCell>{parent.Surname}</TableCell>
                    <TableCell>{parent.Birthday}</TableCell>
                    <TableCell>{parent.Gender}</TableCell>
                    <TableCell>{parent.Email}</TableCell>
                    <TableCell>{parent.Address}</TableCell>
                    <TableCell>{parent.PhoneNumber}</TableCell>
                    <TableCell>{parent.Username}</TableCell>
                    <TableCell>{parent.Password}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteParent(parent.ParentId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10}>No parents found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/ParentForm")}
            sx={{ mt: 2 }}
          >
            Register a parent
          </Button>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ParentsList;
