import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, Box } from '@mui/material';
import DashboardBg from "../../images/geometricbg.png"; 
import { Colors } from "../../utils/colors";
import DashboardSchoolSidebar from "../../components/DashboardComponents/AdminSidebar";


const InvoiceDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [searchChildName, setSearchChildName] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    axios.get('/payment/getPaymentsWithChild')
      .then(response => {
        const sortedPayments = response.data.data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setPayments(sortedPayments);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  const handleChildNameSearch = (e) => {
    setSearchChildName(e.target.value);
  };

  const handleDateSearch = (e) => {
    setSearchDate(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.ChildName.toLowerCase().includes(searchChildName.toLowerCase()) &&
      (searchDate === '' || payment.Date.includes(searchDate))
    );
  });

  return (
    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "140vh",
        marginTop: "-30px",
      }}
    >
      <Box mt={4} mb={4}>
      <DashboardSchoolSidebar/>

      <Typography variant="h4" align="center" gutterBottom>
          Invoice Dashboard
        </Typography>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Search by child name"
            value={searchChildName}
            onChange={handleChildNameSearch}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginRight: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            style={{
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <Grid container justifyContent="center" spacing={2}>
          {filteredPayments.map((payment) => (
            <Grid item xs={12} sm={6} md={4} key={payment.PaymentId}>
              <Paper
                elevation={3}
                style={{ padding: "20px", marginBottom: "20px" }}
              >
                <Typography variant="subtitle1">
                  Payment ID: {payment.PaymentId}
                </Typography>
                <Typography variant="subtitle1">
                  Child Name: {payment.ChildName}
                </Typography>
                <Typography variant="subtitle1">
                  Child Surname: {payment.ChildSurname}
                </Typography>
                <Typography variant="subtitle1">
                  Parent Name: {payment.Name}
                </Typography>
                <Typography variant="subtitle1">
                  Parent Surname: {payment.Surname}
                </Typography>
                <Typography variant="subtitle1">
                  Date: {formatDate(payment.Date)}
                </Typography>
                <Typography variant="subtitle1">
                  Phone Number: {payment.PhoneNumber}
                </Typography>
                <Typography variant="subtitle1">
                  Amount: {payment.Amount}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    
  );
};

export default InvoiceDashboard;
