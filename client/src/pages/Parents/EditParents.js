import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DashboardBg from "../../images/geometricbg.png"; // Assuming you have the background image imported
import { Colors } from "../../utils/colors";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

const EditParent = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const { parentId } = useParams(); // Assuming you have a parent ID in the route params
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
    parentId: parentId,
    childId: "t",
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
        const response = await axios.get("/parents/getChildren");
        setChildren(response.data.child);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, []);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await axios.get(`/parents/getParent/${parentId}`);
        const responseChild = await axios.get(
          `/parents/getchildparent/${parentId}`
        );

        const fetchedParent = response.data.data[0]; // Destructuring the fetched data
        const fetchChild = responseChild.data.child[0];

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
          parentId: parentId,
          childId: fetchChild ? fetchChild.ChildId : "",
        });
      } catch (error) {
        console.error("Fetch parent error:", error);
      }
    };

    fetchParentData();
  }, [parentId]);

  const handleChange = (e) => {
    if (e.$isDayjsObject) {
      setParent((prevParent) => ({
        ...prevParent,
        birthday: e.$d,
      }));
    } else {
      const { name, value } = e.target;
      setParent((prevParent) => ({
        ...prevParent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedParent = {
        ...parent,
        birthday: parent.birthday
          ? dayjs(parent.birthday).format("YYYY-MM-DD")
          : null,
      };
      const response = await axios.put(
        `/parents/updateParent`,
        formattedParent
      );
      if (response.data.success) {
        console.log(response);
        const parentIdsWithChildIds = {
          parentId: parent.parentId,
          childId: parent.childId,
        };

        await axios.put("/parents/updateChildToParent", {
          parentIdsWithChildIds,
        });
      }
      navigate("/DashboardParents");
    } catch (error) {
      console.error("Error updating parent:", error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "Colors.secondary", p: 3, marginTop: -10 }}
      >
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
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Child</InputLabel>
                      <Select
                        name="childId"
                        value={parent.childId}
                        onChange={handleChange}
                        label="Child"
                      >
                        <MenuItem value="">
                          <em>No Child</em>
                        </MenuItem>
                        {children.map((item) => (
                          <MenuItem key={item.ChildId} value={item.ChildId}>
                            {item.Name}
                          </MenuItem>
                        ))}
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
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default EditParent;
