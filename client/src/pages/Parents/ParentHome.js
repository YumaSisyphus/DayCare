import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Snackbar,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/shapebg.png";
import DashboardSchoolSidebar from "../../components/DashboardComponents/ParentSidebar";
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

function ParentHome() {
  const [parentData, setParentData] = useState(null);
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
    if (!loading && authState.isAuthenticated) {
      // Fetch parent data for the currently logged-in parent
      fetch(`/parents/getParent/${authState.user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch parent data");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setParentData(data.data[0]); // Assuming the data is an array with one parent object
          } else {
            throw new Error(data.message || "Parent not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching parent profile:", error);
          setSnackbarMessage("Failed to fetch parent profile");
          setSnackbarOpen(true);
        });
    }
  }, [loading, authState]);

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
            elevation={0} // Remove elevation
            sx={{
              padding: 4,
              backgroundColor: "transparent",
              borderRadius: 0, // Remove border radius
              boxShadow: "none", // Remove box shadow
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: 4 }}>
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  marginLeft: 16,
                  mb: 2,
                  border: `4px solid ${Colors.primary}`,
                  animation: "fadeIn 1s ease-in",
                  "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
                src="/path/to/parent-avatar.jpg"
              />
              {parentData && (
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      animation: "fadeIn 1s ease-in",
                      "@keyframes fadeIn": {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                      },
                    }}
                  >
                    Welcome, {parentData.Name} {parentData.Surname}
                  </Typography>
                </Box>
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

export default ParentHome;
