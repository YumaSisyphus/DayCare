import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const SessionModal = ({ open, handleClose, handleRefresh }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Session Expired
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Your session is about to expire. Do you want to stay logged in?
        </Typography>
        <Button onClick={handleRefresh} variant="contained" color="primary" sx={{ mt: 2 }}>
          Yes
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
          No
        </Button>
      </Box>
    </Modal>
  );
};

export default SessionModal;
