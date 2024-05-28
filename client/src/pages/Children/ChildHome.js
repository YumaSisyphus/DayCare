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
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

function ChildHome() {
  const [parentData, setParentData] = useState(null);
  const [childData, setChildData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
const { authState,loading } = useAuth();
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
    // Fetch parent data
    fetch("/parent/getParent")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch parent data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched parent data:", data); // Debugging log
        if (data) {
          setParentData(data);
          // Once parent data is fetched, fetch child data associated with the parent
          fetch(`/parent/getChildren/${data.ParentId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch children data");
              }
              return response.json();
            })
            .then((childData) => {
              console.log("Fetched children data:", childData);
              setChildData(childData);
            })
            .catch((error) => {
              console.error("Error fetching children data:", error);
              setSnackbarMessage("Failed to fetch children data");
              setSnackbarOpen(true);
            });
        } else {
          throw new Error("Parent not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching parent data:", error);
        setSnackbarMessage("Failed to fetch parent data");
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
            </Box>
            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
            <Box sx={{ flex: 1 }}>
              {parentData ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      {parentData.Name} {parentData.Surname}
                    </Typography>
                  </Grid>
                  {childData.map((child) => (
                    <Grid item xs={12} key={child.ChildId}>
                      <Paper
                        sx={{
                          padding: 3,
                          borderRadius: 10,
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          backgroundColor: Colors.lightGrey,
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          <strong>Name:</strong> {child.Name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <strong>Surname:</strong> {child.Surname}
                        </Typography>
                        {/* Render other child details as needed */}
                      </Paper>
                    </Grid>
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
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}

export default ChildHome;
