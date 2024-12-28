import { useState } from "react";
import { Colors } from "../../utils/colors";
import { Box, Button, Typography } from "@mui/material";
import RightArrow from "../../images/rightArrow.png";
import Staff from "../../images/manager.png";
import { StyledLink } from "../styledCustomComponents";

const DashboardSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box display="flex" height="100%">
      <Box
        display={"flex"}
        sx={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
        width="17%"
        height="100%"
        bgcolor={Colors.white}
        position="fixed"
        left={0}
        top={0}
        borderRadius="5px"
        boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
        zIndex={10}
        flexDirection={"column"}
      >
        <Typography variant="h6" mb={3} ml={3} mt={4}>
          Teacher's Dashboard
        </Typography>
        <StyledLink href="/TeacherHome">My Profile</StyledLink>
        <StyledLink href="/activities">Activities</StyledLink>
        <StyledLink href="/fooddashboard">Food</StyledLink>
        <StyledLink href="/mealdashboard">Meal</StyledLink>
        <StyledLink href="/MyClasses">My Classes</StyledLink>
      </Box>
      <Button
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "3%",
          height: "40px",
          position: "fixed",
          left: "1%",
          bottom: "2%",
          bgcolor: Colors.transparent,
          "&:hover": {
            bgcolor: Colors.white,
          },
          borderRadius: "5px",
          border: `1px solid ${Colors.black}`,
          zIndex: 11,
        }}
        disableRipple
        disableFocusRipple
        onClick={toggleSidebar}
      >
        <img
          src={RightArrow}
          style={{
            transform: isSidebarOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Button>
    </Box>
  );
};

export default DashboardSidebar;
