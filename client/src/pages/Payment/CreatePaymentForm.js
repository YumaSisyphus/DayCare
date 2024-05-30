import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';
import DashboardBg from "../../images/geometricbg.png"; // Import your background image

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
  const [formErrors, setFormErrors] = useState({
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
      .catch((error) => console.error('Error fetching children:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Reset the error message when input changes
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if a child is selected
    if (!formData.childId) {
      setFormErrors({ ...formErrors, childId: 'Please select a child' });
      return; // Exit early if no child is selected
    }

    // Perform validation for other fields
    let isValid = true;
    const newFormErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newFormErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.surname.trim()) {
      newFormErrors.surname = 'Surname is required';
      isValid = false;
    }

    if (!formData.date) {
      newFormErrors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.phonenumber.trim()) {
      newFormErrors.phonenumber = 'Phone Number is required';
      isValid = false;
    }

    if (!formData.amount) {
      newFormErrors.amount = 'Amount is required';
      isValid = false;
    }

    if (isValid) {
      axios
        .post('/payment/createPayment', formData)
        .then((response) => {
          console.log(response.data); // Handle success response
          // Reset the form after successful submission
          setFormData({
            childId: '',
            name: '',
            surname: '',
            date: '',
            phonenumber: '',
            amount: '',
          });
        })
        .catch((error) => {
          console.error('Error creating payment:', error); // Handle error
          // Show error message to the user
        });
    } else {
      setFormErrors(newFormErrors);
    }
  };

  return (
    <div style={{ position: 'relative', backgroundImage: `url(${DashboardBg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(5px)', // Adjust the blur intensity as needed
          zIndex: -1,
        }}
      />
      <Grid container justifyContent="center">
        <Grid item xs={10} md={4}>
          <Box p={4} boxShadow={3} borderRadius={4} marginTop={5} bgcolor="background.paper">
            <Typography variant="h4" align="center" gutterBottom style={{ color: '#b19cd9', fontFamily: "'Baloo 2', sans-serif" }}>
              Payment Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!formErrors.childId}>
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
                    {!!formErrors.childId && (
                      <Typography variant="caption" color="error">
                        {formErrors.childId}
                      </Typography>
                    )}
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
                    error={!!formErrors.name}
                    helperText={formErrors.name}
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
                    error={!!formErrors.surname}
                    helperText={formErrors.surname}
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
  error={!!formErrors.date}
  helperText={formErrors.date}
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
                    error={!!formErrors.phonenumber}
                    helperText={formErrors.phonenumber}
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
                    error={!!formErrors.amount}
                    helperText={formErrors.amount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Create Payment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePaymentForm;
