import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  IconButton,
  ThemeProvider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";

function ClassDashboard() {
  const [classes, setClasses] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedAgeGroupId, setEditedAgeGroupId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewClass, setIsNewClass] = useState(false);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch("/class")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));

    fetch("/agegroup")
      .then((response) => response.json())
      .then((data) => setAgeGroups(data))
      .catch((error) => console.error("Error fetching age groups:", error));

    fetch("/class/staffByClass")
      .then((response) => response.json())
      .then((data) => setStaff(data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedClass(null);
    setEditedName("");
    setEditedAgeGroupId("");
    setIsNewClass(true);
    setOpenModal(true);
  };

  const handleEdit = (cls) => {
    setSelectedClass(cls);
    setEditedName(cls.Name);
    setEditedAgeGroupId(cls.AgeGroupId ? cls.AgeGroupId.toString() : "");
    setIsNewClass(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    if (!editedName.trim()) {
      setSnackbarMessage("Name cannot be empty");
      setSnackbarOpen(true);
      return;
    } else if (!editedAgeGroupId) {
      setSnackbarMessage("Age Group cannot be empty");
      setSnackbarOpen(true);
      return;
    }

    const apiUrl = isNewClass ? "/class" : `/class/${selectedClass.ClassId}`;

    const method = isNewClass ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: editedName,
        AgeGroupId: parseInt(editedAgeGroupId),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          if (isNewClass) {
            setClasses([...classes, data.newClass]);
          } else {
            setClasses(
              classes.map((cls) =>
                cls.ClassId === selectedClass.ClassId
                  ? {
                      ...cls,
                      Name: editedName,
                      AgeGroupId: parseInt(editedAgeGroupId),
                      AgeGroupName: ageGroups.find(
                        (ag) => ag.AgeGroupId === parseInt(editedAgeGroupId)
                      ).RangeG,
                    }
                  : cls
              )
            );
          }
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding class:", error);
        setSnackbarMessage("Error updating or adding class");
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (classId) => {
    fetch(`/class/${classId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          setClasses(classes.filter((cls) => cls.ClassId !== classId));
        }
      })
      .catch((error) => {
        console.error("Error deleting class:", error);
        setSnackbarMessage("Error deleting class");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardSchoolSidebar />
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
        <Container>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" gutterBottom>
              Class Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{ height: "20%" }}
            >
              Add New
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Age Group</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Teachers</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} textAlign={"right"}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.ClassId}>
                    <TableCell>
                      <Typography variant="body1">{cls.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {cls.AgeGroupName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {staff
                          .filter((s) => s.ClassId === cls.ClassId)
                          .map((s) => s.StaffName)
                          .join(", ")}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(cls)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(cls.ClassId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>
              {isNewClass ? "Add New Class" : "Edit Class"}
            </DialogTitle>
            <DialogContent sx={{ width: "300px" }}>
              <TextField
                margin="normal"
                label="Name"
                fullWidth
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="age-group-label">Age Group</InputLabel>
                <Select
                  labelId="age-group-label"
                  value={editedAgeGroupId}
                  label="Age Group"
                  onChange={(e) => setEditedAgeGroupId(e.target.value)}
                >
                  {ageGroups.map((ag) => (
                    <MenuItem key={ag.AgeGroupId} value={ag.AgeGroupId}>
                      {ag.RangeG}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
              >
                Close
              </Button>
            }
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ClassDashboard;
