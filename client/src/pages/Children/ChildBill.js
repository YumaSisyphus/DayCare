import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Card, CardContent, Grid } from "@mui/material";

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
    <div>
      <Typography variant="h4" gutterBottom>Child Payments</Typography>
      <Grid container spacing={2}>
        {payments.map((payment) => (
          <Grid item key={payment.PaymentId} xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Date: {new Date(payment.Date).toLocaleDateString()}</Typography>
                <Typography variant="body1">Amount: {payment.Amount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ChildPayments;
