import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, Typography, Container } from "@mui/material";
import CashIcon from "@mui/icons-material/Money";

const PaymentForm = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useCheckAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading && !authState.isAuthenticated && authState.isRefreshToken) {
      handleOpenModal();
    } else if (!loading && !authState.isRefreshToken) {
      handleLogout();
    }
  }, [loading, authState]);

  useEffect(() => {
    // Fetch children from the server
    axios
      .get("/children/getChildren")
      .then((response) => {
        setChildren(response.data.children);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedChild) {
      newErrors.selectedChild = "Please select a child";
    }
    if (!name.trim()) {
      newErrors.name = "Please enter a name";
    }
    if (!surname.trim()) {
      newErrors.surname = "Please enter a surname";
    }
    if (!phoneNumber.trim() || !/^\d{10}$/i.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If there are no errors, form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) return;

    try {
      const selectedChildInfo = children.find(
        (child) => child.ChildId === selectedChild
      );
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
        return;
      }

      const paymentData = {
        ChildId: selectedChild,
        Name: name,
        Surname: surname,
        PhoneNumber: phoneNumber,
        Amount: amount,
        PaymentMethodId: paymentMethod.id, // Include payment method ID
      };

      // Make a request to your backend to process the payment
      const response = await axios.post("/payment", paymentData);
      // Redirect or show success message
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
      <div style={{ flex: 1 }}>
        <Container style={{ backdropFilter: 'blur(80px)', backgroundColor: 'rgba(137, 207, 240, 0.5)', padding: '20px', borderRadius: '10px', marginTop: 50 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" style={{ marginTop: 200, fontFamily: "'Baloo 2', sans-serif", color: '#0077c0' }}>
                Hi Dear Customer
              </Typography>
              <Typography variant="h6" gutterBottom style={{ color: '#0288d1', fontStyle: 'italic', textDecoration: 'none' }}>
                You Can Make Your Payments Here
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                If you want to make payments with cash, click below:
              </Typography>
              <Button variant="contained" startIcon={<CashIcon />} onClick={() => console.log("Clicked")}>
                Pay with Cash
              </Button>
            </Grid>
            <Grid item xs={12} md={6} >
              <Typography variant="h5" style={{ marginTop: 50, fontFamily: "'Baloo 2', sans-serif", color: '#0077c0', fontWeight: 'bold', marginBottom: 20 ,textAlign:"center" }}>
                Or you can make payments online
              </Typography>
              <form onSubmit={handleSubmit}>
                {errors.selectedChild && <Typography variant="body1" color="error">{errors.selectedChild}</Typography>}
                <FormControl fullWidth error={!!errors.selectedChild}>
                  <InputLabel id="child-label">Select Child</InputLabel>
                  <Select
                    labelId="child-label"
                    id="child"
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">Select Child</MenuItem>
                    {children.map((child) => (
                      <MenuItem key={child.ChildId} value={child.ChildId}>
                        {child.Name} {child.Surname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  style={{ marginTop: 16 }}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  id="surname"
                  label="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  fullWidth
                  style={{ marginTop: 16 }}
                  error={!!errors.surname}
                  helperText={errors.surname}
                />
                <TextField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  style={{ marginTop: 16 }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
                <TextField
                  id="amount"
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  style={{ marginTop: 16 }}
                  error={!!errors.amount}
                  helperText={errors.amount}
                />
                <Typography variant="body1" style={{ marginTop: 16 }}>
                  Card Details:
                </Typography>
                <CardElement style={{ marginTop: 8 }} />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                  Pay Now
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default PaymentForm;
