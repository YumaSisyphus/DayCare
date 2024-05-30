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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "../../components/Searchbar";
import DashboardBg from "../../images/geometricbg.png";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardSchoolSidebar from "../../components/DashboardComponents/AdminSidebar";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";
import InfoIcon from "@mui/icons-material/Info"; // Import Info icon

export default function DashboardChildren() {
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [deleteChildModalOpen, setDeleteChildModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading) {
      if (!authState.isAuthenticated && authState.isRefreshToken) {
        handleOpenModal();
      } else if (!authState.isAuthenticated && !authState.isRefreshToken) {
        handleLogout();
      }
    }
  }, [loading, authState, handleLogout]);

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
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCreateReport = (childId) => {
    navigate(`/ReportForm/${childId}`);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedChildren = [...children].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredChildren = sortedChildren.filter((child) => {
    if (statusFilter === "active") {
      return child.Active;
    } else if (statusFilter === "inactive") {
      return !child.Active;
    } else {
      return true;
    }
  });

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowDropUpIcon />
      ) : (
        <ArrowDropDownIcon />
      );
    }
    return null;
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
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
          height: "100%",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <SearchBar label="Search..." onSearch={handleSearch} />
            <FormControl sx={{ minWidth: 120, marginLeft: 2 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={handleStatusFilterChange}>
                <MenuItem value="all">Show All</MenuItem>
                <MenuItem value="active">Show Active</MenuItem>
                <MenuItem value="inactive">Show Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              onClick={handleDeleteChildModalOpen}
              disabled={selectedChildren.length === 0}
            >
              Delete Selected Children
            </Button>
          </Box>
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
                    <Typography fontWeight="bold">Details</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Photo</Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Name")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Name {renderSortIcon("Name")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Surname")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Surname {renderSortIcon("Surname")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Gender")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Gender {renderSortIcon("Gender")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Birthday")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Birthday {renderSortIcon("Birthday")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Allergies")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Allergies {renderSortIcon("Allergies")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Vaccines")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Vaccines {renderSortIcon("Vaccines")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Payments")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Payments {renderSortIcon("Payments")}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => handleSort("Active")}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Active {renderSortIcon("Active")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontWeight="bold"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredChildren.slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                  : filteredChildren
                ).map((child) => (
                  <TableRow key={child.ChildId}>

                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/ChildHome/${child.ChildId}`)}
                      >
                        <AccountCircleIcon /> {/* Use the new icon instead of PersonIcon */}
                      </IconButton>
                    </TableCell>

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
              count={Math.ceil(filteredChildren.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
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
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}
