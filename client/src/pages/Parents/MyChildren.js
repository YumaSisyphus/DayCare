import React, { useEffect, useState } from "react";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import DashboardSidebar from "../../components/DashboardComponents/TeacherSidebar";
import DashboardBg from "../../images/geometricbg.png";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import { Box, Typography, Button,Card, CardActions, CardContent,CardMedia,TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyChildren = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();
  const navigate = useNavigate();

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
    const fetchChildren = async () => {
      try {
        const response = await fetch(`/children/assignedChildren?ParentId=${authState.user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch children");
        }
        const data = await response.json();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
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
      justifyContent={"center"}
      alignItems={"center"}
    >
      <DashboardSidebar />
      <Box>
        <Typography variant="h4" gutterBottom>
          My children
        </Typography>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={require('../../images/childAvatar.jpg')}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {children.map((child) => (
                <Typography key={child.ChildId}>
                  <Typography>{child.Name}</Typography>
                  <Typography>{child.Surname}</Typography>
                </Typography>
              ))}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
     
        <Button size="small">View Report</Button>
        {children.map((child) => (
        <Button size="small" onClick={() => navigate(`/ChildHome/${child.ChildId}`)}>View Profile</Button>
      ))}
      </CardActions>
    </Card>
       
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default MyChildren;
