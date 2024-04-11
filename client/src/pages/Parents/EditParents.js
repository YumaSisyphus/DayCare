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

const EditParent = () => {
  const navigate = useNavigate();
  const[children, setChildren]= useState([]);
  const { parentId } = useParams(); // Assuming you have a parent ID in the route params
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
    parentId: parentId,
    childId:"",
  });

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/children/getChildren"
        );
        setChildren(response.data.children);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, []);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/parents/getParent/${parentId}`
        );

        const responseChild = await axios.get(
          `http://localhost:5000/children/getchildparent/${parentId}`
        );
        const fetchedParent = response.data.data[0]; // Destructuring the fetched data
        const fetchChild = responseChild.data.children[0];

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
      const response = await axios.put(
        `http://localhost:5000/parents/updateParent`,
        parent
      );
      if (response.data.success) {
        console.log(response);
        const parentIdsWithChildIds = {
          parentId: parent.parentId,
          childId: parent.childId,
        };

        await axios.put("http://localhost:5000/parents/updateChildToParent", {
          parentIdsWithChildIds,
        });
      }
      navigate("/DashboardChildren");
    } catch (error) {
      console.error("Error updating child:", error);
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
        sx={{ flexGrow: 1, bgcolor: "Colors.secondary", p: 3 , marginTop:-10}}
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
                      <Select
                        name="childId"
                        // error={
                        //   valid &&
                        //   (formData.statusId === undefined ||
                        //     formData.statusId === 0 ||
                        //     !formData.statusId)
                        // }
                        value={parent.childId}
                        onChange={handleChange}
                      >
                        <MenuItem value="t">
                          <em>Choose child</em>
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
    </Box>
  );
};

export default EditParent;
