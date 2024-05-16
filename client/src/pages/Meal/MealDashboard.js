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

function MealDashboard() {
  const [meals, setMeals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewMeal, setIsNewMeal] = useState(false);

  useEffect(() => {
    fetch("/meal/getMeal")
      .then((response) => response.json())
      .then((data) => setMeals(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedMeal(null);
    setEditedName("");
    setIsNewMeal(true);
    setOpenModal(true);
  };

  const handleEdit = (meal) => {
    setSelectedMeal(meal);
    setEditedName(meal.Name);
    setIsNewMeal(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    const apiUrl = isNewMeal
      ? "/meal/createMeal"
      : `/meal/updateMeal/${selectedMeal.MealId}`;

    const method = isNewMeal ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: editedName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (
          data.message === "Meal added successfully" ||
          data.message === "Meal updated successfully"
        ) {
          if (isNewMeal) {
            setMeals([...meals, data.newMeal]);
          } else {
            setMeals(
              meals.map((meal) =>
                meal.MealId === selectedMeal.MealId
                  ? {
                      ...meal,
                      Name: editedName,
                    }
                  : meal
              )
            );
          }
          setOpenModal(false);
        } else {
          setSnackbarMessage("Error updating or adding meal");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding meal:", error);
        setSnackbarMessage("Error updating or adding meal");
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (mealId) => {
    fetch(`/meal/deleteFood/${mealId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.success) {
          setMeals(meals.filter((meal) => meal.MealId !== mealId));
        }
      })
      .catch((error) => console.error("Error deleting meal:", error));
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
              Meal Dashboard
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
                    <Typography fontWeight={"bold"}>Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal) => (
                  <TableRow key={meal.MealId}>
                    <TableCell>
                      <Typography variant="body1">{meal.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(meal)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(meal.MealId)}
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
              {isNewMeal ? "Add New Meal" : "Edit Meal"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Name"
                fullWidth
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
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

export default MealDashboard;
