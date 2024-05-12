import React from "react";
import { Paper, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      sx={{
        p: 2,
        mt: 5,
        backgroundColor: "#AEC6CF",
        textAlign: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="black">
          Your footer content here
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
