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
  MenuItem,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

function ChildParent() {
  const [parentsWithChildren, setParentsWithChildren] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [editedChildName, setEditedChildName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewChild, setIsNewChild] = useState(false);
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
    axios
      .get("/parents/getchildparent")
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

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get("/children/getChildren");
        setChildren(result.data.children);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, []);

  const handleEdit = (parent, child) => {
    setSelectedParent(parent);
    setSelectedChild(child);
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
                select
                value={selectedChild.childId}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                {children.map((child) => (
                  <MenuItem key={child.childId} value={child.childId}>
                    {child.childName}
                  </MenuItem>
                ))}
              </TextField>
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

export default ChildParent;
