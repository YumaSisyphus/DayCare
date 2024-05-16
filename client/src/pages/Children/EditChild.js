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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardBg from "../../images/geometricbg.png"; // Assuming you have the background image imported
import { Colors } from "../../utils/colors";

const EditChild = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const { childId } = useParams();
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
    classId: "t",
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("/children/getClasses");
        setClasses(response.data.class);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const responseChild = await axios.get(`/children/getChild/${childId}`);
        const responseClass = await axios.get(
          `/children/getChildClass/${childId}`
        );
        const fetchedChild = responseChild.data.child[0];
        const fetchClass = responseClass.data.class[0];
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
          classId: fetchClass.ClassId,
        });
      } catch (error) {
        console.error("Fetch child error:", error);
      }
    };
    fetchChildData();
  }, [childId]);

  const handleChange = (e) => {
    if (e.$isDayjsObject) {
      setChild((prevChild) => ({
        ...prevChild,
        birthday: e.$d,
      }));
    } else {
      const { name, value } = e.target;
      setChild((prevChild) => ({
        ...prevChild,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedChild = {
        ...child,
        birthday: child.birthday
          ? dayjs(child.birthday).format("YYYY-MM-DD")
          : null,
      };
      const response = await axios.put(`/children/updateChild`, formattedChild);
      if (response.data.success) {
        console.log(response);
        const childIdsWithClassIds = {
          childId: child.childId,
          classId: child.classId,
        };

        await axios.put("/children/updateChildToClass", {
          childIdsWithClassIds,
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
        sx={{ flexGrow: 1, bgcolor: "Colors.secondary", p: 3, marginTop: -10 }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Edit {child.name} {child.surname}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Photo"
                      name="photo"
                      value={child.photo}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={child.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Surname"
                      name="surname"
                      value={child.surname}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                      <DatePicker
                        label="Birthday"
                        name="birthday"
                        minDate={dayjs().subtract(6, "year")}
                        maxDate={dayjs()}
                        value={child.birthday ? dayjs(child.birthday) : null}
                        onChange={handleChange}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                    {/* <TextField
                      label="BirthDay"
                      name="birthday"
                      type="date"
                      value={child.birthday}
                      onChange={handleChange}
                      fullWidth
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        label="Gender"
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
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Vaccines"
                      name="vaccines"
                      value={child.vaccines}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Payments"
                      name="payments"
                      value={child.payments}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="active"
                        label="Status"
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
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        name="classId"
                        // error={
                        //   valid &&
                        //   (formData.statusId === undefined ||
                        //     formData.statusId === 0 ||
                        //     !formData.statusId)
                        // }
                        value={child.classId}
                        onChange={handleChange}
                      >
                        <MenuItem value="t">
                          <em>Choose class</em>
                        </MenuItem>
                        {classes.map((item) => (
                          <MenuItem key={item.ClassId} value={item.ClassId}>
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

export default EditChild;
