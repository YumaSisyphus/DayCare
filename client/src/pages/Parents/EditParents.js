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
  Toolbar,
} from "@mui/material";

const EditParent = () => {
  const navigate = useNavigate();
  const { parentId } = useParams(); // Assuming you have a parent ID in the route params
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [parent, setParent] = useState({
    username: "",
    surname: "",
    phonenumber: "",
    password: "",
    name: "",
    gender: "",
    email: "",
    birthday: "",
    address: "",
    active: 1,
    parentId:parentId,
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
          parentId:parentId,
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
    console.log(parent);
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
 

  return (
    <Box sx={{ display: "flex" }}>
     
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
