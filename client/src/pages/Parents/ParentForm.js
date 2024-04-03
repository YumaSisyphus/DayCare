import React, { useState } from "react";
import axios from "axios";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  TableFooter,
} from "@mui/material";

const ParentForm = ({ setParents }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday: "",
    gender: "",
    email: "",
    address: "",
    phonenumber: "",
    username: "",
    password: "",
    active: 1,
  });

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
        surname: "",
        birthday: "",
        gender: "",
        email: "",
        address: "",
        phonenumber: "",
        username: "",
        password: "",
        active: 1,
      });
    } catch (error) {
      console.error("Error creating parent:", error.message);
    }
  };

  return (
    <TableFooter>
      <TableRow>
        <TableCell>
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
        </TableCell>
        {/* Add other form fields here */}
        <TableCell>
          <Button type="submit" variant="contained" color="primary" onClick={handleCreateParent}>
            Create Parent
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default ParentForm;
