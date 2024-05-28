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
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardBg from "../../images/geometricbg.png"; // Assuming you have the background image imported
import { Colors } from "../../utils/colors";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

const ParentForm = ({ setParents }) => {
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
    childId: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
const { authState,loading } = useAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading) {
      if (!authState.isAuthenticated && authState.isRefreshToken) {
        handleOpenModal();
      } else if (!authState.isAuthenticated && !authState.isRefreshToken) {
        handleLogout();
      }
    }
  }, [loading, authState, handleLogout]);
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get("/children/getChildren");
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
      const createParentResponse = await axios.post(
        "/parents/createParent",
        parentData
      );

      if (createParentResponse.data.success) {
        // Parent created successfully, now assign the children to the parent
        const parentId = createParentResponse.data.data.id;
        const assignChildResponse = await axios.post(
          "/parents/assignChildToParent",
          { parentId, childIds: childId } // Ensure childIds is an array
        );

        if (assignChildResponse.data.success) {
          // Children assigned to parent successfully
          navigate("/DashboardParents");
          setParents((prevParents) => [
            ...prevParents,
            createParentResponse.data.parent,
          ]);
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
            childId: [], // Clear childId from the form after saving
          });
        } else {
          console.error(
            "Error assigning children to parent:",
            assignChildResponse.data.message
          );
        }
      } else {
        console.error(
          "Error creating parent:",
          createParentResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error creating parent:", error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: Colors.secondary, p: 3, marginLeft: "20%" }}
      >
        <Paper elevation={3} sx={{ padding: 2, width: "67%" }}>
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
                <Autocomplete
                  fullWidth
                  multiple // Enable multiple selection
                  value={children.filter((child) =>
                    formData.childId.includes(child.ChildId)
                  )}
                  onChange={(event, newValue) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      childId: newValue.map((child) => child.ChildId), // Map to array of ChildIds
                    }));
                  }}
                  options={children}
                  getOptionLabel={(option) =>
                    option.Name + " " + option.Surname
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Children" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create Parent
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default ParentForm;
