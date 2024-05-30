import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import contactImage from "../images/children70.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    dateCreated: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email should not be empty";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject should not be empty";
      valid = false;
    } else if (formData.subject.trim().length > 50) {
      newErrors.subject = "Subject should not exceed 50 characters";
      valid = false;
    }

    // Date validation
    if (!formData.dateCreated.trim()) {
      newErrors.dateCreated = "Date should not be empty";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message should not be empty";
      valid = false;
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message should not exceed 500 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "/contactform/createContactForm",
          formData
        );
        if (response.data.success) {
          console.log("Contact form submitted successfully!");
          // Reset form fields
          setFormData({
            email: "",
            subject: "",
            dateCreated: "",
            message: "",
          });
          setErrors({});
        }
      } catch (error) {
        console.error("Error submitting contact form:", error.message);
      }
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          color="#7CB9E8"
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            marginTop: "18px",
          }}
          gutterBottom
        >
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <img
              src={contactImage}
              alt="contact-us-image"
              style={{ maxWidth: "100%", borderRadius: "5px" }}
            />
          </Box>
          <Box sx={{ flex: 1, ml: 3 }}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                margin="normal"
                error={!!errors.subject}
                helperText={errors.subject}
              />
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                type="date"
                name="dateCreated"
                value={formData.dateCreated}
                onChange={handleChange}
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  placeholder: "mm/dd/yyyy",
                  style: { paddingRight: "8px" }
                }}
                error={!!errors.dateCreated}
                helperText={errors.dateCreated}
              />
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                margin="normal"
                error={!!errors.message}
                helperText={errors.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{
                  marginTop: "20px",
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUs;
