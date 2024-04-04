import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const ChildForm = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [formDataList, setFormDataList] = useState([
    {
      name: "",
      surname: "",
      birthday: "",
      gender: "t",
      allergies: "",
      vaccines: "",
      photo: "",
      payments: "",
      active: "t",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormDataList((prevFormDataList) => {
      const newDataList = [...prevFormDataList];
      newDataList[index] = {
        ...newDataList[index],
        [name]: value,
      };
      return newDataList;
    });
  };

  const handleCreateChildren = async (e) => {
    e.preventDefault();
    console.log(formDataList);
    try {
      const response = await axios.post(
        "http://localhost:5000/children/createChildren",
        formDataList
      );
      // Reset form data list after successful creation
      setFormDataList([
        {
          name: "",
          surname: "",
          birthday: "",
          gender: "t",
          allergies: "",
          vaccines: "",
          photo: "",
          payments: "",
          active: "t",
        },
      ]);
    } catch (error) {
      console.error("Error creating children:", error.message);
    }
  };

  const handleAddChild = () => {
    setFormDataList((prevFormDataList) => [
      ...prevFormDataList,
      {
        name: "",
        surname: "",
        birthday: "",
        gender: "t",
        allergies: "",
        vaccines: "",
        photo: "",
        payments: "",
        active: "t",
      },
    ]);
  };

  const handleDeleteForm = (index) => {
    if (index === 0 && formDataList.length === 1) {
      setFormDataList([
        {
          name: "",
          surname: "",
          birthday: "",
          gender: "t",
          allergies: "",
          vaccines: "",
          photo: "",
          payments: "",
          active: "t",
        },
      ]);
    } else {
      setFormDataList((prevFormDataList) => {
        const newDataList = [...prevFormDataList];
        newDataList.splice(index, 1);
        return newDataList;
      });
    }
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
        sx={{ bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {formDataList.map((formData, index) => (
          <Grid container justifyContent="center" key={index}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Register a Child {index + 1}
                </Typography>
                <form onSubmit={handleCreateChildren}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Photo"
                        name="photo"
                        value={formData.photo}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Surname"
                        name="surname"
                        value={formData.surname}
                        onChange={(e) => handleChange(index, e)}
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
                        onChange={(e) => handleChange(index, e)}
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
                          //   (formData.statusId === undefined ||
                          //     formData.statusId === 0 ||
                          //     !formData.statusId)
                          // }
                          value={formData.gender}
                          onChange={(e) => handleChange(index, e)}
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
                        value={formData.allergies}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Vaccines"
                        name="vaccines"
                        value={formData.vaccines}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Payments"
                        name="payments"
                        value={formData.payments}
                        onChange={(e) => handleChange(index, e)}
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
                          //   (formData.statusId === undefined ||
                          //     formData.statusId === 0 ||
                          //     !formData.statusId)
                          // }
                          value={formData.active}
                          onChange={(e) => handleChange(index, e)}
                        >
                          <MenuItem value="t">
                            <em>Choose status</em>
                          </MenuItem>
                          <MenuItem value={0}>Passive</MenuItem>
                          <MenuItem value={1}>Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Create Child
                      </Button>
                    </Grid> */}
                  </Grid>
                </form>
                <Box mt={2} textAlign="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteForm(index)}
                  >
                    Delete Form
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ))}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddChild}
              fullWidth
            >
              Add Another Child
            </Button>
            <Button
              onClick={handleCreateChildren}
              variant="contained"
              color="primary"
              fullWidth
            >
              Create Children
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChildForm;
