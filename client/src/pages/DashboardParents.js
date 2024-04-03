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
  TextField,
} from "@mui/material";

const ParentsList = () => {
  const [parents, setParents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateParent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/parents/createParent", formData);
      setParents((prevParents) => [...prevParents, response.data.parent]);
      setFormData({
        name: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error creating parent:", error.message);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {parents && parents.map((parent) => (
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
                <Button variant="contained" color="secondary" onClick={() => handleDeleteParent(parent.ParentId)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <form onSubmit={handleCreateParent}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        required
      />

      <TextField
        label=""
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
      />

      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <TextField
        label="Phone Number"
        name="phonenumber"
        value={formData.phonenumber}
        onChange={handleChange}
        required
      />

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

        <Button type="submit" variant="contained" color="primary">
          Create Parent
        </Button>
      </form>
    </TableContainer>
  );
};

export default ParentsList;
