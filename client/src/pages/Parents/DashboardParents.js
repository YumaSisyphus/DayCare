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
  Paper,
} from "@mui/material";
import ParentForm from "./ParentForm"; // Import the form component

const ParentsList = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/parents/getParents");
        setParents(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParents();
  }, []);

  const handleDeleteParent = async (parentId) => {
    try {
      await axios.delete(`http://localhost:5000/parents/deleteParent/${parentId}`);
      setParents((prevParents) => prevParents.filter((parent) => parent.ParentId !== parentId));
    } catch (error) {
      console.error("Error deleting parent:", error.message);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parents.length > 0 ? (
            parents.map((parent) => (
              <TableRow key={parent.ParentId}>
                <TableCell>{parent.Name}</TableCell>
                <TableCell>{parent.Surname}</TableCell>
                <TableCell>{parent.Birthday}</TableCell>
                <TableCell>{parent.Gender}</TableCell>
                <TableCell>{parent.Email}</TableCell>
                <TableCell>{parent.Address}</TableCell>
                <TableCell>{parent.PhoneNumber}</TableCell>
                <TableCell>{parent.Username}</TableCell>
                <TableCell>{parent.Password}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteParent(parent.ParentId)}
                  >
                    Delete
                  </Button>
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
       <a href="/ParentForm">
        Create Form
       </a>
    </TableContainer>
  );
};

export default ParentsList;
