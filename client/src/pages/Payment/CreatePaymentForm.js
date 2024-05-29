import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import axios from 'axios';

const CreatePaymentForm = () => {
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    childId: '',
    name: '',
    surname: '',
    date: '',
    phonenumber: '',
    amount: '',

  });

  useEffect(() => {
    // Fetch children from server when component mounts
    axios
      .get('/payment/getChildren')
      .then((response) => {
        setChildren(response.data.child);
      })
      .catch((error) =>
        console.error('Error fetching children:', error)
      );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/payment/createPayment', formData)
      .then((response) => {
        console.log(response.data); // Handle success response
        // Redirect to success page or show success message
      })
      .catch((error) => {
        console.error('Error creating payment:', error); // Handle error
        // Show error message to the user
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="childId-label">Select Child</InputLabel>
            <Select
              labelId="childId-label"
              id="childId"
              name="childId"
              value={formData.childId}
              onChange={handleInputChange}
              label="Select Child"
            >
              {children.map((child) => (
                <MenuItem key={child.ChildId} value={child.ChildId}>
                  {child.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="surname"
            name="surname"
            label="Surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            value={formData.phonenumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create Payment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePaymentForm;
