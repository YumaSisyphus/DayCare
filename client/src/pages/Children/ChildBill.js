import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress,Box, Typography, Card, CardContent, Grid } from "@mui/material";
import DashboardBg from "../../images/geometricbg.png"; // Assuming you have the background image imported
import { Colors } from "../../utils/colors";

const ChildPayments = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`/payment/getPaymentsByChildId/${id}`);
        console.log("Fetch result:", response.data);
        if (response.data.success) {
          setPayments(response.data.data);
        } else {
          setError(new Error(response.data.message));
        }
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">Error: {error.message}</Typography>;
  
  return (
    <Box>

    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        py: 3,
      }}
    >
    <div style={{padding:60}}>
      <Typography variant="h4" gutterBottom>Child Payments</Typography>
      <Grid container spacing={2} >
        {payments.map((payment) => (
          <Grid item key={payment.PaymentId} xs={12} sm={6} md={4} >
            <Card variant="outlined" sx={{borderRadius:5}}
            style={{
              background: "rgba(255, 255, 255, 0.9)",

            }}>
              <CardContent >
                <Typography variant="h6" gutterBottom>Date: {new Date(payment.Date).toLocaleDateString()}</Typography>
                <Typography variant="body1">Amount: {payment.Amount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </Box>
    </Box>
  );
};

export default ChildPayments;
