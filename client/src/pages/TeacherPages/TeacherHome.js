import { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardBg from "../../images/geometricbg.png";
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
          marginBottom: "300px",
        }}
      >
        <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
          <CardContent>
            <Avatar alt={authState.user?.username} />
            <Typography variant="h5" component="div">
              {authState.user?.username}
            </Typography>
            <Typography color="text.secondary">
              Role: {authState.user?.role}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default TeacherHome;
