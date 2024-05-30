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
import DashboardBg from "../../images/geometricbg.png"; 
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
  const [errors, setErrors] = useState({});
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();
  const navigate = useNavigate();

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

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "name",
      "surname",
      "birthday",
      "gender",
      "email",
      "address",
      "phonenumber",
      "username",
      "password",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    }

    if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one capital letter";
    }

    if (formData.childId.length === 0) {
      errors.childId = "Please select at least one child";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateParent = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { childId, ...parentData } = formData;
      const createParentResponse = await axios.post(
        "/parents/createParent",
        parentData
      );

      if (createParentResponse.data.success) {
        const parentId = createParentResponse.data.data.id;
        const assignChildResponse = await axios.post(
          "/parents/assignChildToParent",
          { parentId, childIds: childId }
        );

        if (assignChildResponse.data.success) {
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
            childId: [],
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
                  error={!!errors.name}
                  helperText={errors.name}
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
                  error={!!errors.surname}
                  helperText={errors.surname}
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
                  error={!!errors.birthday}
                  helperText={errors.birthday}
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
                  error={!!errors.gender}
                  helperText={errors.gender}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.address}
                  helperText={errors.address}
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
                  error={!!errors.phonenumber}
                  helperText={errors.phonenumber}
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
                  error={!!errors.username}
                  helperText={errors.username}
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
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  multiple
                  value={children.filter((child) =>
                    formData.childId.includes(child.ChildId)
                  )}
                  onChange={(event, newValue) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      childId: newValue.map((child) => child.ChildId),
                    }));
                  }}
                  options={children}
                  getOptionLabel={(option) =>
                    option.Name + " " + option.Surname
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Children"
                      error={!!errors.childId}
                      helperText={errors.childId}
                    />
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
