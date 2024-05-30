import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Container, Divider, Avatar, ThemeProvider } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/shapebg.png";
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
            elevation={0} 
            sx={{
              padding: 4,
              backgroundColor: "transparent",
              borderRadius: 0, 
              boxShadow: "none", 
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
              <Typography 
                 variant="h2"
                 gutterBottom
                 sx={{
                   fontFamily: "Gabriola", // Change font family
                   animation: "fadeIn 1s ease-in", // Add animation
                   "@keyframes fadeIn": {
                     from: { opacity: 0 },
                     to: { opacity: 1 },
                   },
                 }}
               >
                Welcome, {authState.user?.username}!
              </Typography>
            </motion.div>
            <Divider sx={{ width: "100%", marginBottom: 4 }} />
          </Paper>
        </Container>
      </Box>
      <SessionModal open={false} />
    </ThemeProvider>
  );
};

export default AdminHome;
