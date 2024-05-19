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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";

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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("/food/getFood")
      .then((response) => response.json())
      .then((data) => setFoods(data.data))
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
              Food Dashboard
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
                    <Typography fontWeight={"bold"}>Allergens</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? foods.slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                  : foods
                ).map((food) => (
                  <TableRow key={food.FoodId}>
                    <TableCell>
                      <Typography variant="body1">{food.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {food.Description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{food.Allergens}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(food)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(food.FoodId)}
                      >
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
                multiline
                rows={4}
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
    </ThemeProvider>
  );
}

export default Food;
