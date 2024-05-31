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
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import { theme } from "../../utils/theme";

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
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogout = useLogout();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      setOpenSnackbar(false);
    }

    setOpenSnackbar(false);
  };

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
    // Check if the event is from the DatePicker
    if (e && typeof e === "object" && "isValid" in e && e.isValid()) {
      setChild((prevChild) => ({
        ...prevChild,
        birthday: e.toDate(),
      }));
    } else if (e && e.target) {
      // Handle the case when the event is from a form field
      const { name, value } = e.target;
      setChild((prevChild) => ({
        ...prevChild,
        [name]: value,
      }));
    } else {
      setChild((prevChild) => ({
        ...prevChild,
        birthday: null,
      }));
    }
  };

  const validate = () => {
    if (
      !child.name.trim() ||
      !child.surname.trim() ||
      !child.birthday ||
      child.birthday === null ||
      !child.payments ||
      child.gender === "t" ||
      child.classId === "t" ||
      child.active === "t"
    ) {
      const newErrors = "Please fill all the required fields";
      setErrorMessage(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage("Please fill all the required fields");
      setOpenSnackbar(true);
      return;
    }
    try {
      const formattedChild = {
        ...child,
        birthday: child.birthday
          ? dayjs(child.birthday).format("YYYY-MM-DD")
          : null,
      };
      const response = await axios.put(`/children/updateChild`, formattedChild);
      if (response.data.success) {
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
    <ThemeProvider theme={theme}>
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
        {errorMessage && (
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "Colors.secondary",
            p: 3,
            marginTop: -10,
          }}
        >
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper
                elevation={3}
                sx={{
                  overflowX: "auto",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  maxWidth: "none",
                  width: "100%",
                  "@media (max-width: 1200px)": {
                    width: "100%",
                  },
                  padding: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Edit {child.name} {child.surname}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name*"
                        name="name"
                        value={child.name}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Surname*"
                        name="surname"
                        value={child.surname}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        fullWidth
                      >
                        <DatePicker
                          label="Birthday*"
                          name="birthday"
                          minDate={dayjs().subtract(6, "year")}
                          maxDate={dayjs()}
                          value={child.birthday ? dayjs(child.birthday) : null}
                          onChange={handleChange}
                          sx={{ width: "100%" }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Gender*</InputLabel>

                        <Select
                          name="gender"
                          label="Gender*"
                          value={child.gender}
                          onChange={handleChange}
                        >
                          <MenuItem value="t">
                            <em>Choose gender</em>
                          </MenuItem>
                          <MenuItem value="Ma">Male</MenuItem>
                          <MenuItem value="Fe">Female</MenuItem>
                        </Select>
                        {errorMessage.gender && (
                          <Typography variant="body2" color="error">
                            {errorMessage.gender}
                          </Typography>
                        )}
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
                        label="Payments*"
                        name="payments"
                        value={child.payments}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Status*</InputLabel>

                        <Select
                          name="active"
                          label="Status*"
                          value={child.active}
                          onChange={handleChange}
                        >
                          <MenuItem value="t">
                            <em>Choose status</em>
                          </MenuItem>
                          <MenuItem value={0}>Passive</MenuItem>
                          <MenuItem value={1}>Active</MenuItem>
                        </Select>
                        {errorMessage.active && (
                          <Typography variant="body2" color="error">
                            {errorMessage.active}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                        <Select
                          name="classId"
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
                        {errorMessage.classId && (
                          <Typography variant="body2" color="error">
                            {errorMessage.classId}
                          </Typography>
                        )}
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
    </ThemeProvider>
  );
};

export default EditChild;
