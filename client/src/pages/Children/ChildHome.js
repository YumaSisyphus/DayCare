import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importing useNavigate hook
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CardActions,
  Button, // Importing Button from Material-UI
} from "@mui/material";
import { Colors } from "../../utils/colors";
import DashboardBg from "../../images/geometricbg.png"; // Importing the background image
import { TableContainer } from "@mui/material";


const ChildHome = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initializing useNavigate hook
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        console.log("Fetching child with ID:", id); // Log ID parameter
        const result = await axios.get(`/children/getChild/${id}`);
        console.log("Fetch result:", result); // Log full response
        if (result.data && result.data.success && result.data.child.length > 0) {
          console.log("Fetched child data:", result.data.child[0]);
          setChild(result.data.child[0]); // Access the first object in the array
        } else {
          setError(new Error("No child data found"));
        }
      } catch (err) {
        console.error("Error fetching child data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChild();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching child data: {error.message}</Typography>;
  if (!child) return <Typography>No child data found</Typography>;

  return (
    <Box
      sx={{
        backgroundImage: `url(${DashboardBg})`, // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Padding added for spacing
        bgcolor: Colors.secondary,
      }}
    >
      <Box
        sx={{
          p: 3,
          width: "80%", // Adjusted width
          margin: "auto", // Center align
          marginTop: "45px",
          bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: "Arial, sans-serif", // Change font family
            textAlign: "center",
            animation: "slideIn 1s forwards", // Add animation
            "@keyframes slideIn": {
              from: { transform: "translateY(-100%)" },
              to: { transform: "translateY(0)" },
            },
          }}
        >
          Child Profile
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">Name</TableCell>
                <TableCell sx={{ width: "60%" }}>{child.Name}</TableCell> {/* Adjusted width */}
              </TableRow>
              <TableRow>
                <TableCell variant="head">Surname</TableCell>
                <TableCell>{child.Surname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Gender</TableCell>
                <TableCell>{child.Gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Birthday</TableCell>
                <TableCell>{new Date(child.Birthday).toLocaleDateString("en-GB")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Allergies</TableCell>
                <TableCell>{child.Allergies}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Vaccines</TableCell>
                <TableCell>{child.Vaccines}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Payments</TableCell>
                <TableCell>{child.Payments}€</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Active</TableCell>
                <TableCell>{child.Active ? "Yes" : "No"}</TableCell>
              </TableRow>
            </TableBody>
           <CardActions>
        <Button size="small" onClick={() => navigate(`/ChildBill/${id}`)}>View Bill</Button> {/* Use navigate with the child's ID */}
      </CardActions>
          </Table>
        </TableContainer>
        
      </Box>
    </Box>
  );
};

export default ChildHome;
