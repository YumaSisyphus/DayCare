import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const ChildHome = () => {
  const { id } = useParams();
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
        p: 3,
        width: "100%",
        marginTop: "3%",
        marginBottom: "10%",
        marginLeft: "15%",
        marginRight: "15%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Child Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{child.Name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Surname</TableCell>
              <TableCell>{child.Surname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{child.Gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{new Date(child.Birthday).toLocaleDateString("en-GB")}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Allergies</TableCell>
              <TableCell>{child.Allergies}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vaccines</TableCell>
              <TableCell>{child.Vaccines}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payments</TableCell>
              <TableCell>{child.Payments}€</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Active</TableCell>
              <TableCell>{child.Active ? "Yes" : "No"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChildHome;
