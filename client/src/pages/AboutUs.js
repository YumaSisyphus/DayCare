import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  Grid,
} from "@mui/material";
import { Colors } from "../utils/colors";
import { theme } from "../utils/theme";
import image1 from "../images/children1.gif";
import image4 from "../images/preeschooler.jpeg";
import image2 from "../images/toddlerplaying.png";
import image3 from "../images/infantplaying.jpg";
import logo from "../images/handshake.png";
import yourImage from "../images/safety.jpg";

const programs = [
  {
    title: "Infant Program",
    description: "Program for infants aged 6 weeks to 18 months.",
    image: image3,
  },
  {
    title: "Toddler Program",
    description: "Program for toddlers aged 18 months to 3 years.",
    image: image2,
  },
  {
    title: "Preschool Program",
    description: "Program for preschoolers aged 3 to 5 years.",
    image: image4,
  },
];

const ProgramCard = ({ title, description, image }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        "&:hover": {
          "& $overlay": {
            opacity: 1,
          },
        },
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "10px 10px 0 0",
        }}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 218, 185, 0.5)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "10px",
        }}
        className="overlay"
      >
        <Typography variant="body1" color="white">
          Learn More
        </Typography>
      </Box>
    </Card>
  );
};

const ImageWithText = ({ image, title, text }) => {
  return (
    <Box
      bgcolor="#ffddd1"
      p={8}
      mt={2}
      style={{ marginLeft: '-24px', marginRight: '-24px' }}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor="white"
        borderRadius="10px"
        p={2}
        style={{ marginLeft: '-10px', marginRight: '-10px' }}
      >
    
        <Box
          style={{ backgroundColor: 'white', borderRadius: '10px 0 0 10px', flexBasis: '50%' }}
        >
          <img
            src={image}
            alt="Your Image"
            style={{ width: "100%", height: "auto", borderRadius: "10px 0 0 10px" }}
          />
        </Box>


        <Box p={2} flexGrow={1} borderRadius="0 10px 10px 0">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};



const AboutUs = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box width={"100%"} mb={5}>
        <Container maxWidth="xl">
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={5}
            borderRadius={10}
            p={5}
            className="about-us-first-section"
          >
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={6} style={{ paddingRight: "2rem" }}>
                <Typography
                  variant="h3"
                  fontFamily={"'Baloo 2', sans-serif"}
                  textTransform={"uppercase"}
                  fontWeight={450}
                  mb={1}
                  color={Colors.pastelPurple}
                  marginBottom={-5}
                  textAlign="center"
                  marginTop={8}
                >
                  About LET Center
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily={"'Baloo 2', sans-serif"}
                  mb={3}
                  color={Colors.darkSilver}
                  textAlign="justify"
                  marginTop={7}
                >
                  At Our Daycare, we provide a safe and nurturing environment
                  where children can learn, play, and grow. Our experienced
                  staff is dedicated to the well-being and development of each
                  child, focusing on social, emotional, and cognitive skills. We
                  understand the importance of early childhood education and
                  strive to create a stimulating and engaging environment where
                  children can explore and learn at their own pace.
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
                >
                  Explore More
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={image1}
                  alt="Welcome to Our Story"
                  style={{ width: "100%", borderRadius: "10px" , marginTop: "20px" }}
                  className="aboutUs-img"
                />
              </Grid>
            </Grid>

            

            <Box
              mt={8}
              p={3}
              borderRadius={10}
              bgcolor={Colors.lightBlue}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Typography
                variant="h4"
                fontFamily={"'Baloo 2', sans-serif"}
                textTransform={"uppercase"}
                fontWeight={450}
                mb={2}
                color={Colors.pastelPurple}
                textAlign="center"
              >
                Our Programs
              </Typography>
              <Grid container spacing={3}>
                {programs.map((program, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <ProgramCard {...program} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box
              mt={8}
              p={3}
              borderRadius={10}
              bgcolor={Colors.lightBlue}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection={{ xs: 'column', md: 'row' }}
            >
              <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxWidth={{ xs: '100%', md: '30%' }}
                mb={{ xs: 4, md: 0 }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: '100%', height: 'auto', maxWidth: '350px', marginLeft: '300px' }}
                />
              </Box>
              <Box
                flexGrow={1}
                maxWidth={{ xs: '100%', md: '60%' }}
                textAlign={{ xs: 'center', md: 'left' }}
              >
                <Typography
                  variant="h3"
                  fontFamily="'Baloo 2', sans-serif"
                  textTransform="uppercase"
                  marginLeft={25}
                  fontWeight={450}
                  mb={2}
                  color={Colors.pastelPurple}
                >
                   Here’s How<br />
                  We’ll Earn Your<br />
                  Confidence:
                </Typography>

       
              </Box>
            </Box>
          </Box>
          <ImageWithText
          image={yourImage}
           title="Health and Safety"
          text="Test"
/>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUs;
