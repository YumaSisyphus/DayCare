import { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";

const { Box, Typography } = require("@mui/material");

const TeacherHome = () => {
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
  return (
      <Box
        sx={{
          bgcolor: Colors.secondary,
          backgroundImage: `url(${DashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <DashboardSidebar />
      <Typography></Typography>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default TeacherHome;