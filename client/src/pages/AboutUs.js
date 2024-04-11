import React from "react";
import Footer from "../components/Footer";
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
import health from "../images/health.jpg";
import kids from "../images/kids.jpg";
import trust from "../images/trust.jpg";
import classroom from "../images/classroom.jpg";

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
      style={{ marginLeft: "-24px", marginRight: "-24px" }}
    >
      <Box
        display="flex"
        alignItems="center"
        bgcolor="white"
        borderRadius="10px"
        p={2}
        style={{ marginLeft: "-10px", marginRight: "-10px" }}
      >
        <Box
          style={{
            backgroundColor: "white",
            borderRadius: "10px 0 0 10px",
            flexBasis: "50%",
          }}
        >
          <img
            src={image}
            alt="Your Image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px 0 0 10px",
            }}
          />
        </Box>

        <Box p={2} flexGrow={1} borderRadius="0 10px 10px 0">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const AboutUs = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box width={"100%"} mb={5}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={5}
          borderRadius={10}
          className="about-us-first-section"
        >
          <Container maxWidth="xl">
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
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "20px",
                  }}
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
              flexDirection={{ xs: "column", md: "row" }}
            >
              <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxWidth={{ xs: "100%", md: "30%" }}
                mb={{ xs: 4, md: 0 }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "350px",
                    marginLeft: "300px",
                  }}
                />
              </Box>
              <Box
                flexGrow={1}
                maxWidth={{ xs: "100%", md: "60%" }}
                textAlign={{ xs: "center", md: "left" }}
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
                  Here’s How
                  <br />
                  We’ll Earn Your
                  <br />
                  Confidence:
                </Typography>
              </Box>
            </Box>
          </Container>

          <Box
            bgcolor={Colors.orange}
            py={10}
            mt={5}
            style={{ backgroundColor: "#DFCCFB" }}
            width={"100%"}
          >
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={health}
                    alt="Your Image"
                    style={{
                      width: "100%",
                      height: "auto",
               
              
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={6}
                  bgcolor={Colors.white}
                  marginTop={3}
            
               
                >
                  <Typography variant="h4" color= {"#c99bb3"}  style={{fontFamily: "'Baloo 2', sans-serif", textAlign: "center", marginTop: "18px" }} gutterBottom>
                  Health and Safety
                  </Typography>
                  < Typography variant="body1" color={Colors.black} paragraph style={{ marginBottom: "20px", fontSize: "20px" }}>
                  Health and safety are paramount at our daycare center. We prioritize the well-being of every child and staff member by maintaining a clean and hygienic environment.
                 </Typography>
                  <Typography
                 variant="body1"
                 color={Colors.black}
                  paragraph
                 style={{
                fontSize: "16px",
                fontFamily: "'Baloo 2', sans-serif",
                marginBottom: "20px",
                lineHeight: "1.6",
                  }}
                 >
                <ul>
                     <li>  Our daycare follows strict guidelines for food preparation and storage to ensure that all meals and snacks are safe and nutritious. </li>
                     <li>Our staff is trained in CPR and first aid, ensuring they are prepared to handle emergencies. </li>
                     <li>We conduct regular safety inspections of our facilities and equipment to ensure they meet or exceed safety standards</li>
                     <li>We maintain open and transparent communication with parents regarding health and safety practices</li>
                     <li>We have comprehensive safety protocols in place for emergencies.</li>
    
  
                  </ul>
                  <Box display="flex"  marginTop="20px">
  <Button variant="contained" color="primary" style={{ backgroundColor: "#c99bb3", color: "#fff" }}>
    Learn More
  </Button>
</Box>
                    </Typography>
                
              
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box
  bgcolor={Colors.orange}
  py={10}
  mt={5}
  marginTop={0}
  style={{ backgroundColor: "#AEC6CF" }}
  width={"100%"}
>
  <Container maxWidth="xl">
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        bgcolor={Colors.white}

        style={{ textAlign: "center" }}
      >
        <Typography
          variant="h4"
          color="#AEC6CF"
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            marginTop: "18px",
          }}
          gutterBottom
        >
          Convenience and Flexibility 
        </Typography>
        <Typography
          variant="body1"
          color={Colors.black}
          paragraph
          style={{ marginBottom: "20px", fontSize: "20px" }}
        >
         Your child care provider is only as helpful as it is convenient! Since our centers are located nationwide, chances are there’s a KinderCare close by.
        </Typography>
        <Typography
          variant="body1"
          color={Colors.black}
          paragraph
          style={{
            fontSize: "16.6px",
            fontFamily: "'Baloo 2', sans-serif",
            marginBottom: "20px",
            lineHeight: "1.6",
            textAlign: "justify",
            marginLeft: "0px",
            paddingRight: "10px",
           
          }}
        >
          <ul>
            <li>
            Our daycare is centrally located, making drop-offs and pick-ups easy for parents with busy schedules.
            </li>
            <li>
            We offer flexible scheduling options, including full-day, half-day, and extended hours, to accommodate parents' varying needs.
            </li>
            <li>Parents can easily book childcare sessions and manage their schedules online, providing convenience and flexibility.</li>
            <li>Our dedicated customer service team is available to assist parents with any questions or concerns, ensuring a smooth and enjoyable experience.</li>
            
          </ul>
          <Box display="flex" justifyContent="flex-end" marginTop="20px">
  <Button variant="contained" color="primary" style={{ backgroundColor: "#AEC6CF", color: "#fff" }}>
    Learn More
  </Button>
</Box>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={kids}
          alt="Your Image"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Grid>
    </Grid>
  </Container>
</Box>

<Box
            bgcolor={Colors.orange}
            py={10}
            mt={5}
            style={{ backgroundColor: "#FFD4B2" }}
            marginTop={0}
            width={"100%"}
          >
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={trust}
                    alt="Your Image"
                    style={{
                      width: "100%",
                      height: "auto",
               
              
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={6}
                  bgcolor={Colors.white}
                  marginTop={3}
            
               
                >
                  <Typography variant="h4" color= {"#E96479"}  style={{fontFamily: "'Baloo 2', sans-serif", textAlign: "center", marginTop: "18px" }} gutterBottom>
                  Talent and Trust
                  </Typography>
                  < Typography variant="body1" color={Colors.black} paragraph style={{ marginBottom: "20px", fontSize: "20px" }}>
                  Who brings (big) heart and soul into our programs every day? Our teachers! They’re experts at caring for kids and leading your child’s learning journey.
                 </Typography>
                  <Typography
                 variant="body1"
                 color={Colors.black}
                  paragraph
                 style={{
                fontSize: "16px",
                fontFamily: "'Baloo 2', sans-serif",
                marginBottom: "20px",
                lineHeight: "1.6",
                  }}
                 >
                <ul>
                     <li>  We believe that every child has unique talents and abilities. Our programs are designed to recognize and nurture these talents, whether it's in arts, sports, academics, or other areas. </li>
                     <li>Trust is the foundation of our relationship with parents and children. We build trust through open communication, transparency, and by delivering on our promises. </li>
                     <li>We provide a wide range of activities and experiences that allow children to explore their interests and discover new talents.</li>
                     <li>We empower children to take ownership of their learning and development.</li>
    
  
                  </ul>
                  <Box display="flex"  marginTop="20px">
  <Button variant="contained" color="primary" style={{ backgroundColor: "#E96479", color: "#fff" }}>
    Learn More
  </Button>
</Box>
                    </Typography>
                
              
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box
  bgcolor={Colors.orange}
  py={10}
  mt={5}
  marginTop={0}
  style={{ backgroundColor: "#F6F193" }}
  width={"100%"}
>
  <Container maxWidth="xl">
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        bgcolor={Colors.white}

        style={{ textAlign: "center" }}
      >
        <Typography
          variant="h4"
          color="#FFCF81"
          style={{
            fontFamily: "'Baloo 2', sans-serif",
            marginTop: "18px",
          }}
          gutterBottom
        >
         Classrooms and Learning
        </Typography>
        <Typography
          variant="body1"
          color={Colors.black}
          paragraph
          style={{ marginBottom: "20px", fontSize: "20px" }}
        >
        Step into our classrooms to see (and feel) the buzz of learning in motion!
        </Typography>
        <Typography
          variant="body1"
          color={Colors.black}
          paragraph
          style={{
            fontSize: "16.6px",
            fontFamily: "'Baloo 2', sans-serif",
            marginBottom: "20px",
            lineHeight: "1.6",
            textAlign: "justify",
            marginLeft: "0px",
            paddingRight: "10px",
           
          }}
        >
          <ul>
            <li>
            Well-equipped classrooms designed for interactive learning
            </li>
            <li>
            Age-appropriate educational materials and resources
            </li>
            <li>Experienced teachers who create engaging lesson plans.</li>
            <li>Small class sizes for individualized attention.</li>
            <li>Emphasis on hands-on learning experiences.</li>
            <li>
            Integration of technology for enhanced learning
            </li>
            <li>Supportive and inclusive learning environment</li>
            
          </ul>
          <Box display="flex" justifyContent="flex-end" marginTop="20px">
  <Button variant="contained" color="primary" style={{ backgroundColor: "#FFCF81", color: "#fff" }}>
    Learn More
  </Button>
</Box>
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={classroom}
          alt="Your Image"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Grid>
    </Grid>
  </Container>
</Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUs;
