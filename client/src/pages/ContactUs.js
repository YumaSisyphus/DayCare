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
    console.log(formData.email);
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
      maxWidth=""
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#eaf2d7",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px 40px",
          margin: "0px 430px",
          backgroundColor: "#C0D8C0",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
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
            style={{ backgroundColor: "#ffffff" }}
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
            style={{ backgroundColor: "#ffffff" }}
          />
          <TextField
            label=""
            variant="outlined"
            fullWidth
            type="date"
            name="dateCreated"
            value={formData.dateCreated}
            onChange={handleChange}
            required
            margin="normal"
            style={{ backgroundColor: "#ffffff" }}
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
            style={{ backgroundColor: "#ffffff" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginTop: "20px",
              backgroundColor: "#90caf9",
              color: "#ffffff",
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactUs;
