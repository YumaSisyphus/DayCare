import React, { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSidebar from "../../components/DashboardComponents/TeacherSidebar";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { m } from "framer-motion";

const MyClasses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  console.log(authState);
  useEffect(() => {
    if (!loading) {
      if (!authState.isAuthenticated && authState.isRefreshToken) {
        handleOpenModal();
      } else if (!authState.isAuthenticated && !authState.isRefreshToken) {
        handleLogout();
      }
    }
  }, [loading, authState, handleLogout]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `/class/assignedClasses?StaffId=${authState.user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [authState.id]);

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
      p={10}
    >
      <DashboardSidebar />
      <Box>
        <Typography variant="h4" gutterBottom>
          Classes Assigned to You
        </Typography>
        <Box display={"flex"} gap={4}>
          {classes.map((classItem, index) => (
            <Button
              key={classItem.ClassId}
              width={"200px"}
              sx={{
                bgcolor:
                  index % 2 === 0 ? Colors.pastelPeach : Colors.pastelOrange,
                display: "flex",
                flexDirection: "column",
                p: 3,
                borderRadius: 5,
                gap: 2,
                transition: ".4s",
                ":hover": {
                  bgcolor:
                    index % 2 === 0 ? Colors.pastelPurple : Colors.pastelPurple,
                },
              }}
              href={`/classes/${classItem.ClassId}`}
            >
              <Box display={"flex"} gap={2} flexDirection={"column"}>
                <Box display={"flex"} gap={2}>
                  <Typography
                    color={Colors.cleanLightBlack}
                    sx={{ fontWeight: "bold" }}
                  >
                    Class Name:{" "}
                  </Typography>
                  <Typography color={Colors.cleanLightBlack}>
                    {classItem.Name}
                  </Typography>
                </Box>
                <Box display={"flex"} gap={2}>
                  <Typography
                    color={Colors.cleanLightBlack}
                    sx={{ fontWeight: "bold" }}
                  >
                    Age Group:{" "}
                  </Typography>
                  <Typography color={Colors.cleanLightBlack}>
                    {classItem.AgeGroupName}
                  </Typography>
                </Box>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default MyClasses;
