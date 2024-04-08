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
  const [parentsWithChildren, setParentsWithChildren] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [editedChildName, setEditedChildName] = useState("");
  const [editedParentName, setEditedParentName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewChild, setIsNewChild] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/parents/getchildparent")
      .then((res) => {
        const parents = {};
        res.data.forEach((relationship) => {
          const parentId = relationship.ParentId;
          if (!parents[parentId]) {
            parents[parentId] = {
              Name: relationship.Name,
              children: [],
            };
          }
          parents[parentId].children.push({
            childId: relationship.ChildId,
            childName: relationship.ChildName,
          });
        });
        setParentsWithChildren(Object.values(parents));
      })
      .catch((error) => {
        console.error("Error fetching child-parent relationships:", error);
      });
  }, []);

  const handleAddNew = () => {
    setSelectedParent(null);
    setEditedChildName("");
    setIsNewChild(true);
    setOpenModal(true);
  };

  const handleEdit = (parent, child) => {
    setSelectedParent(parent);
    setEditedChildName(child.childName);
    setIsNewChild(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    setOpenModal(false);
  };

  const handleDelete = (parent, childId) => {
    setSnackbarMessage("Error deleting child");
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
                    <Typography fontWeight={"bold"}>Parent Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Children</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} textAlign={"right"}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parentsWithChildren.map((parent) => (
                  <TableRow key={parent.Name}>
                    <TableCell>
                      <Typography variant="body1">{parent.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      {parent.children.map((child) => (
                        <Typography key={child.childId} variant="body1">
                          {child.childName}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(parent, parent.children[0])}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(parent, parent.children[0].childId)}
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
              {isNewChild ? "Add New Child" : "Edit Child"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Child Name"
                fullWidth
                value={editedChildName}
                onChange={(e) => setEditedChildName(e.target.value)}
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
