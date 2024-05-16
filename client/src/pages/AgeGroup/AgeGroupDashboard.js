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
import DashboardSidebar from "../../components/DashboardComponents/sidebar";

function AgeGroupDashboard() {
  const [ageGroups, setAgeGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [editedRange, setEditedRange] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewAgeGroup, setIsNewAgeGroup] = useState(false);

  useEffect(() => {
    fetch("/agegroup")
      .then((response) => response.json())
      .then((data) => setAgeGroups(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedAgeGroup(null);
    setEditedRange("");
    setIsNewAgeGroup(true);
    setOpenModal(true);
  };

  const handleEdit = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
    setEditedRange(ageGroup.RangeG);
    setIsNewAgeGroup(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    if (!editedRange.trim()) {
      setSnackbarMessage("Age Group cannot be empty");
      setSnackbarOpen(true);
      return;
    }

    const apiUrl = isNewAgeGroup
      ? "/agegroup"
      : `agegroup/${selectedAgeGroup.AgeGroupId}`;

    const method = isNewAgeGroup ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Range: editedRange,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          if (isNewAgeGroup) {
            setAgeGroups([...ageGroups, data.newAgeGroup]);
          } else {
            setAgeGroups(
              ageGroups.map((ageGroup) =>
                ageGroup.AgeGroupId === selectedAgeGroup.AgeGroupId
                  ? {
                      ...ageGroup,
                      Range: editedRange,
                    }
                  : ageGroup
              )
            );
          }
          setOpenModal(false);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding age group:", error);
        setSnackbarMessage("Error updating or adding age group");
        setSnackbarOpen(true);
      });
    fetch("/agegroup")
      .then((response) => response.json())
      .then((data) => setAgeGroups(data))
      .catch((error) => console.error("Error fetching data:", error));
    setOpenModal(false);
  };

  const handleDelete = (ageGroupId) => {
    fetch(`agegroup/${ageGroupId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.affectedRows > 0) {
          setAgeGroups(
            ageGroups.filter((ageGroup) => ageGroup.AgeGroupId !== ageGroupId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting age group:", error);
        setSnackbarMessage("Error deleting age group");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardSidebar />
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
              Age Group Dashboard
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
                    <Typography fontWeight={"bold"}>Age Group</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} textAlign={"right"}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ageGroups.map((ageGroup) => (
                  <TableRow key={ageGroup.AgeGroupId}>
                    <TableCell>
                      <Typography variant="body1">{ageGroup.RangeG}</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(ageGroup)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(ageGroup.AgeGroupId)}
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
              {isNewAgeGroup ? "Add New Age Group" : "Edit Age Group"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Age Group"
                fullWidth
                value={editedRange}
                onChange={(e) => setEditedRange(e.target.value)}
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

export default AgeGroupDashboard;
