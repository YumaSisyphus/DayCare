import { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

const { Box, Typography } = require("@mui/material");

const ParentHome = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useCheckAuth();
  const handleLogout = useLogout();

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
  return (
    <Box>
      <Typography></Typography>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default ParentHome;
