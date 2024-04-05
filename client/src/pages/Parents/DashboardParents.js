import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Colors } from "../../utils/colors";
import DashboardBg from "../../images/geometricbg.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../../utils/theme";

const ParentsList = () => {
  const [parents, setParents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/parents/getParents"
        );
        setParents(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParents();
  }, []);

  const handleDeleteParent = async (parentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/parents/deleteParent/${parentId}`
      );
      setParents((prevParents) =>
        prevParents.filter((parent) => parent.ParentId !== parentId)
      );
    } catch (error) {
      console.error("Error deleting parent:", error.message);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxWidth:"150%"
      }}
    >
      
      
      <Container sx={{ flexGrow: 1, p: 3, width:"100%" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" gutterBottom>
              Parents List
            </Typography>
          </Box>
        <Toolbar />
        <Box textAlign="right" marginTop={-5}  marginRight={-8}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/ParentForm")}
            >
              Register a parent
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/ChildParent")}
              sx={{ ml: 2 }}
            >
              Parent-Child List
            </Button>
          </Box>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            maxWidth: "none", // Remove maxWidth constraint
            width: "110%", // Set width directly
            '@media (max-width: 1200px)': { // Example media query for adjusting width
              width: "100%", // Set a different width for smaller screens
            },
          }}
        >          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Surname</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Birthday</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Gender</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Phone No.</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Username</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Password</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold" textAlign="center">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parents.length > 0 ? (
                parents.map((parent) => (
                  <TableRow key={parent.ParentId}>
                    <TableCell>
                      <Typography variant="body1">{parent.Name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Surname}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Birthday}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Gender}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Address}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.PhoneNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Username}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{parent.Password}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box textAlign="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteParent(parent.ParentId)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/EditParents/${parent.ParentId}`)}
                        >
                          Edit
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10}>No parents found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ParentsList;
