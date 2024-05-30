import { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardBg from "../../images/shapebg.png";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";

import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";

const TeacherHome = () => {
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
    <Box
      sx={{
        bgcolor: Colors.secondary,
        backgroundImage: `url(${DashboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <DashboardSidebar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          marginBottom: "160px",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            mb: 3,
            mt: 3,
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
          <CardContent>
            <Avatar
              sx={{
                width: 130,
                height: 130,
                marginLeft: 18,
                marginBottom: 2,
                border: `4px solid ${Colors.primary}`,
                animation: "fadeIn 1s ease-in",
                "@keyframes fadeIn": {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            />
            <Box sx={{ textAlign: "center", marginRight: 4 }}>
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
                Welcome, {authState.user?.username}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default TeacherHome;
