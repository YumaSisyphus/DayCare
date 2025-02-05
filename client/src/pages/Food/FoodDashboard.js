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
  Pagination,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import DashboardSidebar from "../../components/DashboardComponents/TeacherSidebar";
import SessionModal from "../../components/SessionModal";
import useLogout from "../../utils/useLogout";
import useCheckAuth from "../../utils/useCheckAuth";
import { useAuth } from "../../utils/authContext";

function Food() {
  const [foods, setFoods] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAllergens, setEditedAllergens] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewFood, setIsNewFood] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAllergenFilter, setSelectedAllergenFilter] = useState("");
  const [allergens, setAllergens] = useState([]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameSearchQuery, setNameSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useAuth();
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
    fetch("/food/getFood")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data.data);

        const allergens = data.data.reduce((allergens, food) => {
          const foodAllergens = food.Allergens.split(",").map((allergen) =>
            allergen.trim()
          );
          return [...new Set([...allergens, ...foodAllergens])];
        }, []);

        setAllergens(allergens);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedFood(null);
    setEditedName("");
    setEditedDescription("");
    setEditedAllergens("");
    setIsNewFood(true);
    setOpenModal(true);
  };

  const handleEdit = (food) => {
    setSelectedFood(food);
    setEditedName(food.Name);
    setEditedDescription(food.Description);
    setEditedAllergens(food.Allergens);
    setIsNewFood(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSaveChanges = () => {
    // Validation: Ensure name, description, and allergens are not empty
    if (!editedName || !editedDescription || !editedAllergens) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    }

    const apiUrl = isNewFood
      ? "/food/createFood"
      : `/food/updateFood/${selectedFood.FoodId}`;

    const method = isNewFood ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: editedName,
        Description: editedDescription,
        Allergens: editedAllergens,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (
          data.message === "Food added successfully" ||
          data.message === "Food updated successfully"
        ) {
          if (isNewFood) {
            setFoods([...foods, data.newFood]);
          } else {
            setFoods(
              foods.map((food) =>
                food.FoodId === selectedFood.FoodId
                  ? {
                      ...food,
                      Name: editedName,
                      Description: editedDescription,
                      Allergens: editedAllergens,
                    }
                  : food
              )
            );
          }
          setOpenModal(false);
        } else {
          setSnackbarMessage("Error updating or adding food");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding food:", error);
        setSnackbarMessage("Error updating or adding food");
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (foodId) => {
    fetch(`/food/deleteFood/${foodId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.success) {
          setFoods(foods.filter((food) => food.FoodId !== foodId));
        }
      })
      .catch((error) => console.error("Error deleting food:", error));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNameSearch = (e) => {
    setNameSearchQuery(e.target.value);
  };

  const handleAllergenFilterChange = (e) => {
    setSelectedAllergenFilter(e.target.value);
  };

  const nameFilter = foods.filter((food) =>
    food.Name.toLowerCase().includes(nameSearchQuery.toLowerCase())
  );

  const allergenFilter = nameFilter.filter(
    (food) =>
      selectedAllergenFilter === "" ||
      food.Allergens.toLowerCase().includes(
        selectedAllergenFilter.toLowerCase()
      )
  );

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
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Food Dashboard
          </Typography>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={nameSearchQuery}
            onChange={handleNameSearch}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            select
            label="Filter by Allergen"
            variant="outlined"
            value={selectedAllergenFilter}
            onChange={handleAllergenFilterChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: "16px" }}
          >
            <MenuItem value="">All</MenuItem>
            {allergens.map((allergen) => (
              <MenuItem key={allergen} value={allergen}>
                {allergen}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ marginBottom: "16px" }}
          >
            Add New
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Allergens</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allergenFilter.map((food) => (
                  <TableRow key={food.FoodId}>
                    <TableCell>{food.Name}</TableCell>
                    <TableCell>{food.Description}</TableCell>
                    <TableCell>{food.Allergens}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(food)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(food.FoodId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(foods.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
          <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>
              {isNewFood ? "Add New Food" : "Edit Food"}
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
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Allergens"
                fullWidth
                value={editedAllergens}
                onChange={(e) => setEditedAllergens(e.target.value)}
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
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}

export default Food;
