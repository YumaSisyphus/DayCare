import { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";

import { Box, Typography, Grid,Paper, Container,Divider, Avatar,ThemeProvider } from "@mui/material";

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
                {authState.user?.username}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ flex: 1, marginTop: 2 }}>
              <Grid container spacing={2}>
                    <Paper
                      sx={{
                        padding: 3,
                        borderRadius: 10,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: Colors.lightGrey,
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        <strong>Role:</strong>{authState.user?.role}

                      </Typography>
                    </Paper>              
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <SessionModal open={false} />
    </ThemeProvider>
  );
}

export default AdminHome;
