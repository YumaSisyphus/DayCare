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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";

function Activity() {
  const [activities, setActivities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewActivity, setIsNewActivity] = useState(false);

  useEffect(() => {
    fetch("/activity")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedActivity(null);
    setEditedName("");
    setEditedDescription("");
    setIsNewActivity(true);
    setOpenModal(true);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setEditedName(activity.Name);
    setEditedDescription(activity.Description);
    setIsNewActivity(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    const apiUrl = isNewActivity
      ? "/activity"
      : `/activity/${selectedActivity.ActivityId}`;

    const method = isNewActivity ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: editedName,
        Description: editedDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          if (isNewActivity) {
            setActivities([...activities, data.newActivity]);
          } else {
            setActivities(
              activities.map((activity) =>
                activity.ActivityId === selectedActivity.ActivityId
                  ? {
                      ...activity,
                      Name: editedName,
                      Description: editedDescription,
                    }
                  : activity
              )
            );
          }
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding activity:", error);
        setSnackbarMessage("Error updating or adding activity");
        setSnackbarOpen(true);
      });
    setOpenModal(false);
    fetch("/activity")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (activityId) => {
    fetch(`/activity/${activityId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          setActivities(
            activities.filter((activity) => activity.ActivityId !== activityId)
          );
        }
      })
      .catch((error) => console.error("Error deleting activity:", error));
    setSnackbarMessage("Error deleting activity");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
        <Container>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" gutterBottom>
              Activity Dashboard
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
                    <Typography fontWeight={"bold"}>Description</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} textAlign={"right"}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.ActivityId}>
                    <TableCell>
                      <Typography variant="body1">{activity.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {activity.Description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(activity)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(activity.ActivityId)}
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
              {isNewActivity ? "Add New Activity" : "Edit Activity"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Name"
                fullWidth
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
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

export default Activity;
