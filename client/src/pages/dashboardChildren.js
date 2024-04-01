import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardChildren() {
  const [children, setChildren] = useState([]);
  const [deleteChildModalOpen, setDeleteChildModalOpen] = useState(false);
  const [deletingChild, setDeletingChild] = useState();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/children/getChildren"
        );
        setChildren(result.data.children);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, []);

  const handleDeleteChildModalOpen = (childId) => {
    setDeletingChild(childId);
    setDeleteChildModalOpen(true);
  };

  const handleDeleteChildModalClose = () => {
    setDeletingChild(null);
    setDeleteChildModalOpen(false);
  };

  const handleDeleteChild = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/children/deleteChild/${deletingChild}`
      );
      //   handlePageChange(pageNr);
      handleDeleteChildModalClose();
    } catch (error) {
      console.error("Error deleting child:", error.message);
    }
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"99.6vh"}
    >
      {/* <Box
        mt={7}
        mb={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchBar label="Search..." onSearch={handleSearch} />
        <Link href="/legalActsForm">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: Colours.whiteish3,
              color: Colours.lightGrey,
              ":hover": {
                bgcolor: Colours.govMain,
                color: "white",
              },
            }}
          >
            Shto
          </Button>
        </Link>
      </Box> */}
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Photo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Surname
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Gender
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Birthday
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Allergies
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Vaccines
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Payments
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Active
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontFamily={"Lexend"}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.map((child) => (
                <TableRow key={child.ChildId}>
                  <TableCell>
                    <Typography variant="body2">{child.Photo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Surname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Gender}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(child.Birthday).toLocaleDateString("en-GB")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Allergies}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Vaccines}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{child.Payments}€</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {child.Active ? "Yes" : "No"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <Box display="flex" flexDirection={"column"}>
                        <Button>View</Button>
                        {/* <Button onClick={() => handleEdit(child.ChildId)}>
                          Edit
                        </Button> */}
                        <Button
                          onClick={() =>
                            handleDeleteChildModalOpen(child.ChildId)
                          }
                        >
                          Delete
                        </Button>
                      </Box>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={deleteChildModalOpen}
          onClose={handleDeleteChildModalClose}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this child?</Typography>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              pb: 3,
            }}
          >
            <Button onClick={handleDeleteChildModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteChild} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
