import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  TextField,
} from "@mui/material";
import { Colors } from "../utils/colors";
import Children from "../images/ChildrenVector.png";
import ChildrenPlaying from "../images/ChildrenPlaying.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlayfulBg from "../images/PlayfulBackground.jpg";
import SchoolIcon from "@mui/icons-material/School";
import ServiceBoxImg from "../images/geometricbg.png";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ChildrenLearning from "../images/ChildrenLearning.png";
import { theme } from "../utils/theme";
import Cookies from "js-cookie";
import Footer from "../components/Footer";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/Login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box width={"100%"} mb={5}>
        <Container maxWidth="xl">
          <Box
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={10}
            mt={5}
            borderRadius={10}
            p={5}
            className="welcome-first-section"
          >
            <Box zIndex={1} width={"35%"} mt={6}>
              <Typography
                variant="h3"
                fontFamily={"'Baloo 2', sans-serif"}
                textTransform={"uppercase"}
                fontWeight={450}
                mb={1}
              >
                Welcome To LET
              </Typography>
              <Typography
                variant="h6"
                fontFamily={"'Baloo 2', sans-serif"}
                mb={3}
                color={Colors.darkSilver}
              >
                At LET Daycare, we provide a safe and nurturing environment
                where children can learn, play, and grow. Our experienced staff
                is dedicated to the well-being and development of each child,
                focusing on social, emotional, and cognitive skills!
              </Typography>

              <Button
                sx={{
                  color: Colors.black,
                  border: `2px solid ${Colors.pastelPeach}`,
                  padding: "2% 5%",
                  borderRadius: "10px",
                  ":hover": {
                    border: `2px solid ${Colors.pastelPurple}`,
                    backgroundColor: `${Colors.pastelPurple}60`,
                  },
                }}
                onClick={handleLogout}
              >
                Login Here
              </Button>
            </Box>

            <img
              src={ChildrenPlaying}
              alt="logo"
              className="welcome-screen-img"
            />
          </Box>
          <Typography
            variant="h3"
            fontFamily={"'Baloo 2', sans-serif"}
            textTransform={"uppercase"}
            fontWeight={450}
            textAlign={"center"}
            mt={12}
          >
            What We Offer
          </Typography>
          <Box
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            mt={3}
            className="welcome-services-box"
          >
            <Card
              variant="outlined"
              style={{
                margin: "0 10px",
                minWidth: 250,
                maxWidth: 300,
                minHeight: 250,
                backgroundColor: Colors.primary,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              className="welcome-services-card"
            >
              <img
                src={ServiceBoxImg}
                alt="logo"
                className="welcome-services-img"
              />
              <CardContent sx={{ zIndex: 10, position: "relative" }}>
                <ChildCareIcon style={{ fontSize: 40, marginBottom: 10 }} />
                <Typography variant="h6" gutterBottom>
                  Child Care
                </Typography>
                <Typography variant="body2">
                  Our daycare provides a safe and caring environment for your
                  child, ensuring their well-being and happiness.
                </Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{
                margin: "0 10px",
                minWidth: 250,
                maxWidth: 300,
                minHeight: 250,
                backgroundColor: Colors.pastelPurple,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              className="welcome-services-card"
            >
              <img
                src={ServiceBoxImg}
                alt="logo"
                className="welcome-services-img"
              />
              <CardContent sx={{ zIndex: 10, position: "relative" }}>
                <SchoolIcon style={{ fontSize: 40, marginBottom: 10 }} />
                <Typography variant="h6" gutterBottom>
                  Early Education
                </Typography>
                <Typography variant="body2">
                  We offer early education programs designed to stimulate
                  cognitive and social development in children.
                </Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{
                margin: "0 10px",
                minWidth: 250,
                maxWidth: 300,
                minHeight: 250,
                backgroundColor: Colors.pastelPeach,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              className="welcome-services-card"
            >
              <img
                src={ServiceBoxImg}
                alt="logo"
                className="welcome-services-img"
              />
              <CardContent sx={{ zIndex: 10, position: "relative" }}>
                <RestaurantIcon style={{ fontSize: 40, marginBottom: 10 }} />
                <Typography variant="h6" gutterBottom>
                  Nutritious Meals
                </Typography>
                <Typography variant="body2">
                  We provide balanced and nutritious meals to ensure your child
                  has the energy to learn and play.
                </Typography>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              style={{
                margin: "0 10px",
                minWidth: 250,
                maxWidth: 300,
                minHeight: 250,
                backgroundColor: Colors.pastelBlue,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
              className="welcome-services-card"
            >
              <img
                src={ServiceBoxImg}
                alt="logo"
                className="welcome-services-img"
              />
              <CardContent sx={{ zIndex: 10, position: "relative" }}>
                <BedroomBabyIcon style={{ fontSize: 40, marginBottom: 10 }} />
                <Typography variant="h6" gutterBottom>
                  Creative Activities
                </Typography>
                <Typography variant="body2">
                  Our daycare offers a variety of creative activities to inspire
                  imagination and foster artistic expression.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            gap={10}
            mt={10}
            p={9}
          >
            <img
              src={ChildrenLearning}
              alt="logo"
              className="welcome-screen-img2"
            />
            <Box zIndex={1} width={"40%"} mt={6}>
              <Typography
                variant="h3"
                fontFamily={"'Baloo 2', sans-serif"}
                textTransform={"uppercase"}
                fontWeight={450}
              >
                Our Approach
              </Typography>
              <Typography
                variant="h6"
                fontFamily={"'Baloo 2', sans-serif"}
                color={Colors.darkSilver}
              >
                We believe in providing a holistic approach to childcare. We
                focus on nurturing each child's individual needs and interests,
                fostering a love for learning, and promoting social and
                emotional development. Our experienced and dedicated staff
                create a safe and stimulating environment where children can
                explore, discover, and grow.
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            position={"relative"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={8}
          >
            <Typography
              variant="h3"
              textTransform={"uppercase"}
              fontWeight={450}
            >
              Get In Touch With Us!
            </Typography>
            <Typography variant="h6" color={Colors.darkSilver}>
              Your all-in-one Platform to manage your Childcare Center, save
              time, enhance learnings and build stronger bonds with parents!
            </Typography>
            <Box
              display={"flex"}
              gap={2}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              mb={5}
            >
              <TextField
                sx={{
                  width: { md: "40%", xl: "40%" },
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${Colors.pastelPurple} !important`,
                      borderWidth: "2px",
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: `${Colors.pastelPurple} !important`,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${Colors.pastelPurple} !important`,
                      boxShadow: `0 0 5px ${Colors.pastelPurple}`,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: `${Colors.black}`,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: `${Colors.black}`,
                  },
                  "& .MuiInputBase-input": {
                    color: `${Colors.black}`,
                  },
                }}
                InputLabelProps={{
                  style: { color: `${Colors.black}` },
                  shrink: true,
                }}
                placeholder="Type your email..."
              />
              <Button
                sx={{
                  color: Colors.black,
                  border: `2px solid ${Colors.pastelPeach}`,
                  backgroundColor: Colors.pastelPeach,
                  borderRadius: "10px",
                  height: "100%",
                  padding: "1% 2%",
                  mt: 1.9,
                  ":hover": {
                    border: `2px solid ${Colors.pastelOrange}`,
                    backgroundColor: `${Colors.pastelOrange}`,
                  },
                }}
              >
                Login Here
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default WelcomeScreen;
