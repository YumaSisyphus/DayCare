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
  ThemeProvider,
} from "@mui/material";
import SearchBar from "../../components/Searchbar";
import DashboardBg from "../../images/geometricbg.png";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";

export default function DashboardChildren() {
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [deleteChildModalOpen, setDeleteChildModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const result = await axios.get("/children/getChildren");
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
      await axios.delete(`/children/deleteChildren`, {
        data: { childIds: selectedChildren },
      });
      handleDeleteChildModalClose();
    } catch (error) {
      console.error("Error deleting children:", error.message);
    }
  };

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

  const handleCreateReport = (childId) => {
    // Redirect to the create report page with the childId
    navigate(`/ReportForm/${childId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardSchoolSidebar />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          bgcolor: Colors.secondary,
          backgroundImage: `url(${DashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "100%",
          height: "99.6vh",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: "100%",
            marginTop: "3%",
            marginBottom: "10%",
            marginLeft: "15%",
            marginRight: "15%",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" gutterBottom>
              Children List
            </Typography>
          </Box>
          <Button
            sx={{ marginBottom: 2 }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/AddChild")}
          >
            Add Child
          </Button>
          <SearchBar label="Search..." onSearch={handleSearch} />
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              maxWidth: "none",
              width: "100%",
              "@media (max-width: 1200px)": {
                width: "100%",
              },
            }}
          >
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Photo</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Surname</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Gender</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Birthday</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Allergies</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Vaccines</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Payments</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Active</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Actions</Typography>
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
                      <Box display="flex" flexDirection={"column"}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            navigate(`/EditChild/${child.ChildId}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCreateReport(child.ChildId)}
                        >
                          Create Report
                        </Button>
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
          <Button
            onClick={handleDeleteChildModalOpen}
            disabled={selectedChildren.length === 0}
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
    </ThemeProvider>
  );
}
