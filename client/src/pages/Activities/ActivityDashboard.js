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
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  useEffect(() => {
    fetch("/activity")
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setEditedName(activity.Name);
    setEditedDescription(activity.Description);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    fetch(`/activity/${selectedActivity.ActivityId}`, {
      method: "PUT",
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
          setOpenModal(false);
        }
      })
      .catch((error) => console.error("Error updating activity:", error));
    setSnackbarMessage("Error updating activity");
    setSnackbarOpen(true);
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
          <Typography variant="h4" gutterBottom>
            Activity Dashboard
          </Typography>
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
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity, index) => (
                  <TableRow key={activity.ActivityId}>
                    <TableCell>
                      {" "}
                      <Typography variant="body1" fontWeight={"bold"}>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{activity.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {activity.Description}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
            <DialogTitle>Edit Activity</DialogTitle>
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
