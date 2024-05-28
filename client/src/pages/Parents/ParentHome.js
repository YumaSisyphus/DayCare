import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Snackbar,
  Grid,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";

function ParentHome() {
  const [parentData, setParentData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch parent data and filter for the currently logged-in parent
    fetch("/parents/getParent")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch parent data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched parent data:", data); // Debugging log
        const currentUsername = "loggedInParentUsername"; // Replace with actual logic to get the logged-in parent's username
        const parent = data.data.find((p) => p.Username === currentUsername);
        if (parent) {
          setParentData(parent);
        } else {
          throw new Error("Parent not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching parent profile:", error);
        setSnackbarMessage("Failed to fetch parent profile");
        setSnackbarOpen(true);
      });
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardSchoolSidebar />
      <Box
        sx={{
          bgcolor: Colors.secondary,
          backgroundImage: `url(${DashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 20,
              marginTop: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: `4px solid ${Colors.primary}`,
                }}
                src="/path/to/parent-avatar.jpg"
              />
              {parentData && (
                <Box textAlign="center">
                  <Typography variant="h6" gutterBottom>
                    {parentData.Name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {parentData.Surname}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
            <Box sx={{ flex: 1 }}>
              {parentData ? (
                <Grid container spacing={2}>
                  {Object.entries(parentData).map(([key, value]) => (
                    key !== "ParentId" && key !== "Name" && key !== "Surname" && key !== "Password" && (
                      <Grid item xs={12} sm={6} key={key}>
                        <Paper
                          sx={{
                            padding: 3,
                            borderRadius: 10,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: Colors.lightGrey,
                          }}
                        >
                          <Typography variant="body1" gutterBottom>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                            {value}
                          </Typography>
                        </Paper>
                      </Grid>
                    )
                  ))}
                </Grid>
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Box>
          </Paper>
        </Container>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </ThemeProvider>
  );
}

export default ParentHome;
