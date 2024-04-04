import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
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
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const EditChild = () => {
  const navigate = useNavigate();
  const { childId } = useParams(); // Assuming you have a child ID in the route params
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [child, setChild] = useState({
    name: "",
    surname: "",
    birthday: "",
    gender: "t",
    allergies: "",
    vaccines: "",
    photo: "",
    payments: "",
    active: "",
    childId: childId,
  });

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/children/getChild/${childId}`
        );
        console.log(response.data.child)
        const fetchedChild = response.data.child[0]; // Destructuring the fetched data

        setChild({
          name: fetchedChild.Name,
          surname: fetchedChild.Surname,
          birthday: fetchedChild.Birthday,
          gender: fetchedChild.Gender,
          allergies: fetchedChild.Allergies,
          vaccines: fetchedChild.Vaccines,
          photo: fetchedChild.Photo,
          payments: fetchedChild.Payments,
          active: fetchedChild.Active,
          childId: childId,
        });
      } catch (error) {
        console.error("Fetch child error:", error);
      }
    };

    fetchChildData();
  }, [childId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild((prevChild) => ({
      ...prevChild,
      [name]: value,
    }));
    console.log(child);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/children/updateChild`, child);
      navigate("/DashboardChildren"); // Navigate to the child dashboard after editing
    } catch (error) {
      console.error("Error updating child:", error);
    }
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
          <ListItem button onClick={() => navigate("/DashboardChildren")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Children" />
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
                Edit Child
              </Typography>
              <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Photo"
                      name="photo"
                      value={child.photo}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={child.name}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Surname"
                      name="surname"
                      value={child.surname}
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
                      value={child.birthday}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        name="gender"
                        // error={
                        //   valid &&
                        //   (child.statusId === undefined ||
                        //     child.statusId === 0 ||
                        //     !child.statusId)
                        // }
                        value={child.gender}
                        onChange={handleChange}
                      >
                        <MenuItem value="t">
                          <em>Choose gender</em>
                        </MenuItem>
                        <MenuItem value="Ma">Male</MenuItem>
                        <MenuItem value="Fe">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Allergies"
                      name="allergies"
                      value={child.allergies}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Vaccines"
                      name="vaccines"
                      value={child.vaccines}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Payments"
                      name="payments"
                      value={child.payments}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        name="active"
                        // error={
                        //   valid &&
                        //   (child.statusId === undefined ||
                        //     child.statusId === 0 ||
                        //     !child.statusId)
                        // }
                        value={child.active}
                        onChange={handleChange}
                      >
                        <MenuItem value="t">
                          <em>Choose status</em>
                        </MenuItem>
                        <MenuItem value={0}>Passive</MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Create Child
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

export default EditChild;
