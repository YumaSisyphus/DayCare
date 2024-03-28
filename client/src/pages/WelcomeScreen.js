import { Box, Container, Typography } from "@mui/material";
import { Colors } from "../utils/colors";
import { motion } from "framer-motion";
import Logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");

    navigate("/login");
  };

  return (
    <div>
      <Box width={"100%"} sx={{ bgcolor: `${Colors.primary}` }}>
        <Container maxWidth="xl">
          <Box
            height={"400px"}
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={20}
            p={5}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginTop: 2 }}
            >
              Logout
            </Button>
            <img src={Logo} alt="logo" className="welcome-screen-logo" />
            <Box zIndex={1} width={"30%"}>
              <Typography variant="h2" fontFamily={"'Baloo 2', sans-serif"}>
                LET Center
              </Typography>
              <Typography variant="h6" fontFamily={"'Baloo 2', sans-serif"}>
                "Quality Care for Your Little Ones" "Safe, Engaging, and
                Nurturing Environment" "Discover Our Programs and Enroll Today"
              </Typography>
            </Box>
            <motion.div
              className="welcome-screen-top-animation"
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
              }}
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default WelcomeScreen;
