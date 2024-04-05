import React, { useState, useEffect } from "react";
import axios from "axios";
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

function ChildParent() {
  const [relationships, setRelationships] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [editedChildName, setEditedChildName] = useState("");
  const [editedParentName, setEditedParentName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewRelationship, setIsNewRelationship] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/parents/getchildparent")
      .then((res) => {
        setRelationships(res.data);
      })
      .catch((error) => {
        console.error("Error fetching child-parent relationships:", error);
      });
  }, []);

  const handleAddNew = () => {
    setSelectedRelationship(null);
    setEditedChildName("");
    setEditedParentName("");
    setIsNewRelationship(true);
    setOpenModal(true);
  };

  const handleEdit = (relationship) => {
    setSelectedRelationship(relationship);
    setEditedChildName(relationship.ChildName);
    setEditedParentName(relationship.ParentName);
    setIsNewRelationship(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    setOpenModal(false);
  };

  const handleDelete = (relationshipId) => {
    // Handle deleting relationship here
    setSnackbarMessage("Error deleting relationship");
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
              Child-Parent Relationships
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
                    <Typography fontWeight={"bold"}>Child Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Parent Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} textAlign={"right"}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relationships.map((relationship) => (
                  <TableRow key={relationship.ChildId + "-" + relationship.ParentId}>
                    <TableCell>
                      <Typography variant="body1">{relationship.ChildName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{relationship.Name}</Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(relationship)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(relationship.RelationshipId)}
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
              {isNewRelationship ? "Add New Relationship" : "Edit Relationship"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Child Name"
                fullWidth
                value={editedChildName}
                onChange={(e) => setEditedChildName(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Parent Name"
                fullWidth
                value={editedParentName}
                onChange={(e) => setEditedParentName(e.target.value)}
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

export default ChildParent;
