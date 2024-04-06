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
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import { groupParents } from "../../utils/groupParents"; // Adjust the path as per your project structure

const ParentsList = () => {
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/parents/getParents");
        const processedParents = groupParents(response.data.data); // Process the data here
        setParents(processedParents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParents();
  }, []);

  const groupParents = (data) => {
    const grouped = {};
    data.forEach((parent) => {
      if (!grouped[parent.ParentId]) {
        grouped[parent.ParentId] = { ...parent, children: [] };
      }
      grouped[parent.ParentId].children.push({ Name: parent.ChildName, Surname: parent.ChildSurname });
    });
    return Object.values(grouped);
  };

  const handleDeleteParent = async (parentId) => {
    try {
      await axios.delete(`http://localhost:5000/parents/deleteParent/${parentId}`);
      setParents((prevParents) => prevParents.filter((parent) => parent.ParentId !== parentId));
    } catch (error) {
      console.error("Error deleting parent:", error.message);
    }
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
        maxWidth: "150%",
      }}
    >
      <Container sx={{ flexGrow: 1, p: 3, width: "100%" }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4" gutterBottom>
            Parents List
          </Typography>
        </Box>
        <Toolbar />
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            maxWidth: "none",
            width: "110%",
            '@media (max-width: 1200px)': {
              width: "100%",
            },
          }}
        >
          <Table sx={{ minWidth: 800 }}>
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
                  <Typography fontWeight="bold">Children</Typography>
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
                      <Typography variant="body1">
                        {parent.children.map((child, index) => (
                          <span key={index}>{child.Name} {child.Surname}{index !== parent.children.length - 1 ? ', ' : ''}</span>
                        ))}
                      </Typography>
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
                  <TableCell colSpan={11}>No parents found.</TableCell>
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
