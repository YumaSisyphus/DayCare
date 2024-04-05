import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import SearchBar from "../../components/Searchbar";

export default function DashboardChildren() {
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]); // Track selected children
  const [deleteChildModalOpen, setDeleteChildModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/children/getChildren"
        );
        const filteredRows = result.data.children.filter((data) =>
          `${data.Name} ${data.Surname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setChildren(filteredRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChildren();
  }, [searchTerm]);

  const handleDeleteChildModalOpen = () => {
    setDeleteChildModalOpen(true);
  };

  const handleDeleteChildModalClose = () => {
    setDeleteChildModalOpen(false);
  };

  const handleDeleteChildren = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/children/deleteChildren`,
        { data: { childIds: selectedChildren } } // Pass selected child IDs to the backend
      );
      //   handlePageChange(pageNr);
      handleDeleteChildModalClose();
    } catch (error) {
      console.error("Error deleting children:", error.message);
    }
  };

  // Toggle selection of a child
  const toggleSelectChild = (childId) => {
    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter((id) => id !== childId));
    } else {
      setSelectedChildren([...selectedChildren, childId]);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1); // Reset page to 1 when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"99.6vh"}
    >
      <SearchBar label="Search..." onSearch={handleSearch} />
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
              {(rowsPerPage > 0
                ? children.slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                : children
              ).map((child) => (
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            navigate(`/EditChild/${child.ChildId}`)
                          }
                        >
                          Edit
                        </Button>
                        {/* <Button
                          onClick={() =>
                            handleDeleteChildModalOpen(child.ChildId)
                          }
                        >
                          Delete
                        </Button> */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedChildren.includes(child.ChildId)}
                              onChange={() => toggleSelectChild(child.ChildId)}
                            />
                          }
                          label="SELECT"
                        ></FormControlLabel>
                      </Box>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(children.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
        {/* <Dialog
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
            <Button onClick={handleDeleteChildren} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog> */}
        <Button
          onClick={handleDeleteChildModalOpen}
          disabled={selectedChildren.length === 0} // Disable button if no child selected
        >
          Delete Selected Children
        </Button>
        <Dialog
          open={deleteChildModalOpen}
          onClose={handleDeleteChildModalClose}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the selected children?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteChildModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteChildren} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
