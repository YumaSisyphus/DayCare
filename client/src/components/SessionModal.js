import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/useLogout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SessionModal = ({ open }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogOut = useLogout();


  const handleRefresh = async () => {
    try {
      const response = await axios.post("/login/token/refresh");
      if (response.data.success) {
        handleClose();
      }
    } catch (error) {
      console.error("Couldn't authenticate you", error);
    }
  };
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Session Expired
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Your session is about to expire. Do you want to stay logged in?
        </Typography>
        <Button
          onClick={handleRefresh}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Yes
        </Button>
        <Button
          onClick={handleLogOut}
          variant="outlined"
          color="primary"
          sx={{ mt: 2, ml: 2 }}
        >
          No
        </Button>
      </Box>
    </Modal>
  );
};

export default SessionModal;
