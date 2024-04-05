import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  TableFooter,
  Box,
  Typography,
  Paper,
  Grid,
  AppBar,
  MenuItem,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";


const ParentForm = ({ setParents }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
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
    childId:"",
  });

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/children/getChildren"
        );
        setChildren(result.data.children);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateParent = async (e) => {
    e.preventDefault();
    try {
      const { childId, ...parentData } = formData;
      const createParentResponse = await axios.post("http://localhost:5000/parents/createParent", parentData);
      console.log(createParentResponse);
  
      if (createParentResponse.data.success) {
        // Parent created successfully, now assign the child to the parent
        const parentId = createParentResponse.data.data.insertId;
        console.log(parentId);
        const assignChildResponse = await axios.post("http://localhost:5000/parents/assignChildToParent", { parentId, childId });
  
        if (assignChildResponse.data.success) {
          // Child assigned to parent successfully
          navigate("/DashboardParents");
          setParents((prevParents) => [...prevParents, createParentResponse.data.parent]);
          setFormData({
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
            childId: "", // Clear childId from the form after saving
          });
        } else {
          console.error("Error assigning child to parent:", assignChildResponse.data.message);
        }
      } else {
        console.error("Error creating parent:", createParentResponse.data.message);
      }
    } catch (error) {
      console.error("Error creating parent:", error.message);
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
  <Box> 
    <table>
  <TableRow>
    <TableCell>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Register a Parent
        </Typography>
        <form onSubmit={handleCreateParent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label=""
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              label="Select Child"
              name="childId"
              value={formData.childId}
              onChange={handleChange}
              required
              fullWidth
            >
              {children.map((child) => {
                return (
                  <MenuItem key={child.ChildId} value={child.ChildId}>
                    {child.Name}
                  </MenuItem>
                );
              })}
            </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Parent
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </TableCell>
  </TableRow>
  </table>
     </Box>
      </Box>
    </Box>
  );
};

export default ParentForm;