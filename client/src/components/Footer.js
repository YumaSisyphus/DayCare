import React from "react";
import { Paper, Typography, Container, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Paper
      style={{
        backgroundColor: "#111222",
        color: "#fff",
        padding: "50px 0",
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="footer-left">
              <Typography variant="h5" gutterBottom>
                LET Center
              </Typography>
              <Typography variant="body2">
              A Loving Environment for Every Child.
            
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="footer-center">
              <Typography variant="h5" gutterBottom>
                Quick Links
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link></li>
                <li><Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>About Us</Link></li>
                <li><Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>Children</Link></li>
                <li><Link href="#" style={{ color: "#ccc", textDecoration: "none" }}>Contact</Link></li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="footer-right">
              <Typography variant="h5" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "10px" }}>
                Connect with us on social media:
              </Typography>
              <div className="social-links" style={{ display: "flex", justifyContent: "center" }}>
                <IconButton href="#" style={{ color: "#fff", margin: "0 5px" }}><Facebook /></IconButton>
                <IconButton href="#" style={{ color: "#fff", margin: "0 5px" }}><Twitter /></IconButton>
                <IconButton href="#" style={{ color: "#fff", margin: "0 5px" }}><Instagram /></IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
        <Typography variant="body1" style={{ marginTop: "30px", borderTop: "1px solid #333", paddingTop: "20px", fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} LET Center. All Rights Reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
