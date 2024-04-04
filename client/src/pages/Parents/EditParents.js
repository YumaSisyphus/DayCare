import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
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

const EditParent = () => {
  const navigate = useNavigate();
  const { parentId } = useParams(); // Assuming you have a parent ID in the route params
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const [parent, setParent] = useState({
    name: "",
    surname: "",
    birthday: "",
    gender: "",
    email: "",
    address: "",
    phonenumber: "",
    username: "",
    password: "",
    active: 1,
  });

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/parents/getParent/${parentId}`
        );
        const fetchedParent = response.data.data[0]; // Destructuring the fetched data

        setParent({
          name: fetchedParent.Name,
          surname: fetchedParent.Surname,
          birthday: fetchedParent.Birthday,
          gender: fetchedParent.Gender,
          email: fetchedParent.Email,
          address: fetchedParent.Address,
          phonenumber: fetchedParent.PhoneNumber,
          username: fetchedParent.Username,
          password: fetchedParent.Password,
          active: fetchedParent.Active,
        });
      } catch (error) {
        console.error("Fetch parent error:", error);
      }
    };

    fetchParentData();
  }, [parentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/parents/updateParent`, parent);
      navigate("/DashboardParents"); // Navigate to the parent dashboard after editing
    } catch (error) {
      console.error("Error updating parent:", error);
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

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#FFDAB9",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "#333333" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#333333" }}
          >
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ color: "black" }}
          >
            Logout
          </Button>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Edit Parent
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={parent.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Surname"
                      name="surname"
                      value={parent.surname}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label=""
                      name="birthday"
                      type="date"
                      value={parent.birthday}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Gender"
                      name="gender"
                      value={parent.gender}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={parent.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Address"
                      name="address"
                      value={parent.address}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phonenumber"
                      value={parent.phonenumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Username"
                      name="username"
                      value={parent.username}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={parent.password}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditParent;
