import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, Box } from '@mui/material';

const InvoiceDashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/payment/getPaymentsWithChild')
      .then(response => {
        setPayments(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  return (
    <Box mt={4} mb={4}>
      <Typography variant="h4" align="center" gutterBottom>Invoice Dashboard</Typography>
      <Grid container justifyContent="center" spacing={2}>
        {payments.map(payment => (
          <Grid item xs={12} sm={6} md={4} key={payment.PaymentId}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="subtitle1">Payment ID: {payment.PaymentId}</Typography>
              <Typography variant="subtitle1">Child Name: {payment.ChildName}</Typography>
              <Typography variant="subtitle1">Child Surname: {payment.ChildSurname}</Typography>
              <Typography variant="subtitle1">Name: {payment.Name}</Typography>
              <Typography variant="subtitle1">Surname: {payment.Surname}</Typography>
              <Typography variant="subtitle1">Date: {payment.Date}</Typography>
              <Typography variant="subtitle1">Phone Number: {payment.PhoneNumber}</Typography>
              <Typography variant="subtitle1">Amount: {payment.Amount}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InvoiceDashboard;
