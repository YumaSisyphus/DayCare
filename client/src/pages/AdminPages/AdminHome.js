import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Container, Divider, Avatar, ThemeProvider } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import SessionModal from "../../components/SessionModal";

const AdminHome = () => {
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
              borderRadius: 20,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
            
              <Avatar
                sx={{
                  marginTop: 3,
                  marginLeft: 12,
                  width: 120,
                  height: 120,
                  mb: 4,
                  border: `4px solid ${Colors.primary}`,
                }}
                src="/path/to/admin-avatar.jpg"
              />
              <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Welcome, {authState.user?.username}!
              </Typography>
            </motion.div>
            <Divider sx={{ width: "100%", marginBottom: 4 }} />
            <Box sx={{ flex: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      padding: 3,
                      borderRadius: 10,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      backgroundColor: Colors.lightGrey,
                      position: "relative",
                      textAlign: "center",
                      color: Colors.text,
                    }}
                  >
                   <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
                      <strong>Role:</strong> {authState.user?.role}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          
          </Paper>
        </Container>
      </Box>
      <SessionModal open={false} />
    </ThemeProvider>
  );
};

export default AdminHome;
