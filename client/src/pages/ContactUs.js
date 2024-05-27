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
import contactImage from "../images/children.gif";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    dateCreated: null,
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/contactform/createContactForm",
        formData
      );
      if (response.data.success) {
        console.log("Contact form submitted successfully!");
      }
    } catch (error) {
      setError("Error submitting contact form");
      console.error("Error submitting contact form:", error.message);
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
        <Typography variant="h4" gutterBottom>
          Get in Touch
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
            {/* Your image here */}
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
