import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardBg from "../../images/geometricbg.png"; // Assuming you have the background image imported
import { Colors } from "../../utils/colors";
import { useNavigate } from "react-router-dom";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

const ChildForm = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [formDataList, setFormDataList] = useState([
    {
      name: "",
      surname: "",
      birthday: "",
      gender: "t",
      allergies: "",
      vaccines: "",
      photo: null,
      photoName: "",
      payments: "",
      active: "t",
      classId: "t",
    },
  ]);
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
    const fetchClasses = async () => {
      try {
        const result = await axios.get("/children/getClasses");
        setClasses(result.data.class);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (index, e) => {
    if (e.$isDayjsObject) {
      setFormDataList((prevFormDataList) => {
        const newDataList = [...prevFormDataList];
        newDataList[index] = {
          ...newDataList[index],
          birthday: e.$d,
        };
        return newDataList;
      });
    } else if (e.target.name === "photo") {
      const fd = new FormData();
      fd.append("photo", JSON.stringify(e.target.files[0]));
      setFormDataList((prevFormDataList) => {
        const newDataList = [...prevFormDataList];
        newDataList[index] = {
          ...newDataList[index],
          photo: fd,
          photoName: e.target.files[0].name,
        };
        return newDataList;
      });
      // for (let [key, value] of fd) {
      //   console.log(`${key}: ${value}`);
      // }
      console.log(e.target.files[0]);
    } else {
      const { name, value } = e.target;
      setFormDataList((prevFormDataList) => {
        const newDataList = [...prevFormDataList];
        newDataList[index] = {
          ...newDataList[index],
          [name]: value,
        };
        return newDataList;
      });
    }
  };

  const handleCreateChildren = async (e) => {
    e.preventDefault();
    try {
      const formattedChildrenData = formDataList.map((child) => {
        const { classId, ...formattedChild } = child;
        return {
          ...formattedChild,
          birthday: formattedChild.birthday
            ? dayjs(formattedChild.birthday).format("YYYY-MM-DD")
            : null,
        };
      });
      const response = await axios.post(
        "/children/createChildren",
        formattedChildrenData
      );
      if (response.data.success) {
        const childIdsWithClassIds = response.data.childIds.map(
          (childId, index) => ({
            childId,
            classId: formDataList[index].classId,
          })
        );
        console.log(childIdsWithClassIds);
        await axios.post(
          "/children/assignChildToClass",
          { childIdsWithClassIds } // Ensure childIds is an array
        );
      }
      setFormDataList([
        {
          name: "",
          surname: "",
          birthday: "",
          gender: "t",
          allergies: "",
          vaccines: "",
          photo: null,
          photoName: "",
          payments: "",
          active: "t",
          classId: "t",
        },
      ]);
      navigate("/DashboardChildren");
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
        photo: null,
        photoName: "",
        payments: "",
        active: "t",
        classId: "t",
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
          photo: null,
          photoName: "",
          payments: "",
          active: "t",
          classId: "t",
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

  return (
    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
        <Grid container justifyContent="center" spacing={3}>
          {formDataList.map((formData, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Register a Child {index + 1}
                </Typography>
                <form
                  onSubmit={handleCreateChildren}
                  enctype="multipart/form-data"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <input
                        type="file"
                        name="photo"
                        onChange={(e) => handleChange(index, e)}
                      />
                      {/* <TextField
                        label="Photo"
                        name="photo"
                        value={formData.photo}
                        onChange={(e) => handleChange(index, e)}
                        required
                        fullWidth
                      /> */}
                      <Typography>{formData.photoName}</Typography>
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
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        fullWidth
                      >
                        <DatePicker
                          label="Birthday"
                          name="birthday"
                          minDate={dayjs().subtract(6, "year")}
                          maxDate={dayjs()}
                          value={
                            formData.birthday ? dayjs(formData.birthday) : null
                          }
                          onChange={(e) => handleChange(index, e)}
                          sx={{ width: "100%" }}
                        />
                      </LocalizationProvider>
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
                          value={formData.classId}
                          onChange={(e) => handleChange(index, e)}
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
          ))}
        </Grid>
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
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default ChildForm;
