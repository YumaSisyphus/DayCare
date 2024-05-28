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
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

function ParentProfile() {
  const [parentData, setParentData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { authState, loading } = useCheckAuth();
  const handleLogout = useLogout();
  const [modalOpen, setModalOpen] = useState(false);

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
    const fetchParentData = async () => {
      try {
        const response = await fetch("/parent/getParent");
        if (!response.ok) {
          throw new Error("Failed to fetch parent data");
        }
        const data = await response.json();
        console.log("Fetched parent data:", data); // Debugging log
        setParentData(data);
      } catch (error) {
        console.error("Error fetching parent data:", error);
        setSnackbarMessage("Failed to fetch parent data");
        setSnackbarOpen(true);
      }
    };
    fetchParentData();
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
            </Box>
            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
            <Box sx={{ flex: 1 }}>
              {parentData ? (
                <Grid container spacing={2}>
                  {/* Display parent data here */}
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
        <SessionModal open={modalOpen} />
      </Box>
    </ThemeProvider>
  );
}

export default ParentProfile;
