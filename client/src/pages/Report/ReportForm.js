import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

const ReportForm = () => {
  const { childId } = useParams();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/children/createReport",
        {
          childId: childId,
          description: description,
        }
      );
      if (response.data.success) {
        // Report created successfully, handle further actions if needed
      }
    } catch (error) {
      setError("Error creating report");
      console.error("Error creating report:", error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create Report
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Report
            </Button>
          </Grid>
        </Grid>
      </form>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default ReportForm;
