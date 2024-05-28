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

function AdminHome() {
  const [adminData, setAdminData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch staff data and filter for the admin
    fetch("/staff/getStaff")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched staff data:", data); // Debugging log
        const admin = data.data.find((staff) => staff.Role === "Admin");
        if (admin) {
          setAdminData(admin);
        } else {
          throw new Error("Admin not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching admin profile:", error);
        setSnackbarMessage("Failed to fetch admin profile");
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
                src="/path/to/admin-avatar.jpg"
              />
              {adminData && (
                <Box textAlign="center">
                  <Typography variant="h6" gutterBottom>
                    {adminData.Name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {adminData.Surname}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
            <Box sx={{ flex: 1 }}>
              {adminData ? (
                <Grid container spacing={2}>
                  {Object.entries(adminData).map(([key, value]) => (
                    key !== "StaffId" && key !== "Name" && key !== "Surname" && (
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

export default AdminHome;
