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
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import useCheckAuth from "../../utils/useCheckAuth";
import SessionModal from "../../components/SessionModal";

function AdminHome() {
  const [adminData, setAdminData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading) {
      if (!authState.isAuthenticated && authState.isRefreshToken) {
        handleOpenModal();
      } else if (!authState.isAuthenticated && !authState.isRefreshToken) {
        handleLogout();
      }
    }
  }, [loading, authState, handleLogout]);

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
        <Container maxWidth="md" sx={{ marginTop: -2 }}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 10,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Add box shadow
              position: "relative", // Make the position relative for absolute elements
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center items horizontally
            }}
          >
            {/* Adding decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                bgcolor: Colors.primary,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "-20px",
                left: "10%",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                bgcolor: Colors.primary,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "-30px",
                right: "10%",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                bgcolor: Colors.primary,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            {/* End decorative elements */}

            <Box sx={{ marginBottom: -4.5 }}>
              <Avatar
                sx={{
                  marginTop: 3,
                  marginRight: 75,
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: `4px solid ${Colors.primary}`,
                }}
                src="/path/to/admin-avatar.jpg"
              />
            </Box>
            {adminData && (
              <Box
                sx={{
                  textAlign: "center",
                  marginTop: -7,
                  paddingBottom: 6,
                  marginRight: 28,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ marginRight: 1 }}>
                    {adminData.Name}
                  </Typography>
                  <Typography variant="h4" sx={{}}>
                    {adminData.Surname}
                  </Typography>
                </Box>
              </Box>
            )}
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ flex: 1, marginTop: 2 }}>
              {adminData ? (
                <Grid container spacing={2}>
                  {Object.entries(adminData).map(
                    ([key, value]) =>
                      key !== "StaffId" &&
                      key !== "Name" &&
                      key !== "Surname" &&
                      key !== "Role" &&
                      key !== "Password" && (
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
                              <strong>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </strong>{" "}
                              {value}
                            </Typography>
                          </Paper>
                        </Grid>
                      )
                  )}
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
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}

export default AdminHome;
