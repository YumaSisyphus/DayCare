import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  IconButton,
  ThemeProvider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";
import DashboardSidebar from "../../components/DashboardComponents/sidebar";
import DashboardSchoolSidebar from "../../components/DashboardComponents/schoolSidebar";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";
import { useAuth } from "../../utils/authContext";

function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");
  const [editedBirthday, setEditedBirthday] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewStaff, setIsNewStaff] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
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
    setLoadingPage(true);
    fetch("/staff/getStaff")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch staff");
        }
        return response.json();
      })
      .then((data) => {
        setStaffList(data.data);
      })
      .catch((error) => {
        console.error("Error fetching staff:", error);
        setSnackbarMessage("Failed to fetch staff");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);

  const handleAddNew = () => {
    setSelectedStaff(null);
    resetFormFields();
    setIsNewStaff(true);
    setOpenModal(true);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setEditedName(staff.Name);
    setEditedSurname(staff.Surname);
    setEditedBirthday(staff.Birthday);
    setEditedGender(staff.Gender);
    setEditedEmail(staff.Email);
    setEditedPhoneNumber(staff.PhoneNumber);
    setEditedRole(staff.Role);
    setEditedUsername(staff.Username);
    setEditedAddress(staff.Address);
    setEditedPassword(staff.Password);
    setIsNewStaff(false);
    setOpenModal(true);
  };

  const resetFormFields = () => {
    setEditedName("");
    setEditedSurname("");
    setEditedBirthday("");
    setEditedGender("");
    setEditedEmail("");
    setEditedPhoneNumber("");
    setEditedRole("");
    setEditedUsername("");
    setEditedAddress("");
    setEditedPassword("");
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    // Basic validation to check if any of the required fields are empty
    if (
      !editedName ||
      !editedSurname ||
      !editedBirthday ||
      !editedGender ||
      !editedEmail ||
      !editedPhoneNumber ||
      !editedRole ||
      !editedUsername ||
      !editedAddress ||
      !editedPassword
    ) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarOpen(true);
      return;
    }

    // Validation for password field
    if (editedPassword.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters long.");
      setSnackbarOpen(true);
      return;
    }

    if (!/[A-Z]/.test(editedPassword)) {
      setSnackbarMessage("Password must contain at least one capital letter.");
      setSnackbarOpen(true);
      return;
    }

    const apiUrl = isNewStaff
      ? "/staff/createStaff"
      : `/staff/updateStaff/${selectedStaff.StaffId}`;

    const method = isNewStaff ? "POST" : "PUT";

    const requestBody = {
      Name: editedName,
      Surname: editedSurname,
      Birthday: editedBirthday,
      Gender: editedGender,
      Email: editedEmail,
      PhoneNumber: editedPhoneNumber,
      Role: editedRole,
      Username: editedUsername,
      Address: editedAddress,
      Password: editedPassword,
    };

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to save changes");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (
          data.message === "Staff added successfully" ||
          data.message === "Staff updated successfully"
        ) {
          if (isNewStaff) {
            setStaffList([...staffList, data.newStaff]);
          } else {
            setStaffList(
              staffList.map((staff) =>
                staff.StaffId === selectedStaff.StaffId
                  ? {
                      ...staff,
                      Name: editedName,
                      Surname: editedSurname,
                      Birthday: editedBirthday,
                      Gender: editedGender,
                      Email: editedEmail,
                      PhoneNumber: editedPhoneNumber,
                      Role: editedRole,
                      Username: editedUsername,
                      Address: editedAddress,
                      Password: editedPassword,
                    }
                  : staff
              )
            );
          }
          setOpenModal(false);
        } else {
          setSnackbarMessage("Error updating or adding staff");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding staff:", error);
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (staffId) => {
    fetch(`/staff/deleteStaff/${staffId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.success) {
          setStaffList(staffList.filter((staff) => staff.StaffId !== staffId));
        }
      })
      .catch((error) => console.error("Error deleting staff:", error));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStaffList = staffList.filter((staff) =>
    `${staff.Name} ${staff.Surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <DashboardSchoolSidebar />
      <Box
        sx={{
          bgcolor: Colors.secondary,
          backgroundImage: `url(${DashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Container sx={{ marginTop: 2 }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={2}
            marginTop={15}
          >
            <Typography variant="h4" gutterBottom sx={{ marginTop: -5 }}>
              Staff Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{ height: "20%", marginTop: 2 }}
            >
              Add New
            </Button>
          </Box>
          <TextField
            margin="normal"
            label="Search Staff"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "200px" }}
          />
          {loadingPage ? (
            <Typography>Loading...</Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                backdropFilter: "blur(10px)",
                marginLeft: "-3.5rem",
                width: "80rem",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Surname</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Birthday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Gender</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>PhoneNumber</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Role</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Address</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={"bold"}>Username</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={"bold"}>Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredStaffList.slice(
                        (page - 1) * rowsPerPage,
                        (page - 1) * rowsPerPage + rowsPerPage
                      )
                    : filteredStaffList
                  ).map((staff) => (
                    <TableRow key={staff.StaffId}>
                      <TableCell>{staff.Name}</TableCell>
                      <TableCell>{staff.Surname}</TableCell>
                      <TableCell itemType="date">{staff.Birthday}</TableCell>
                      <TableCell>{staff.Gender}</TableCell>
                      <TableCell>{staff.Email}</TableCell>
                      <TableCell>{staff.PhoneNumber}</TableCell>
                      <TableCell>{staff.Role}</TableCell>
                      <TableCell>{staff.Address}</TableCell>
                      <TableCell>{staff.Username}</TableCell>

                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(staff)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(staff.StaffId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(staffList.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>{" "}
        </Container>
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>
            {selectedStaff ? "Edit Staff" : "Add New Staff"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="Name"
              fullWidth
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Surname"
              fullWidth
              value={editedSurname}
              onChange={(e) => setEditedSurname(e.target.value)}
            />
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              Birthday:
            </Typography>{" "}
            {/* Add the title "Birthday" */}
            <TextField
              margin="normal"
              fullWidth
              type="date"
              value={editedBirthday}
              onChange={(e) => setEditedBirthday(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Gender"
              fullWidth
              value={editedGender}
              onChange={(e) => setEditedGender(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Email"
              fullWidth
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              label="PhoneNumber"
              fullWidth
              value={editedPhoneNumber}
              onChange={(e) => setEditedPhoneNumber(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Role"
              fullWidth
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Address"
              fullWidth
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Username"
              fullWidth
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Password"
              fullWidth
              type="password"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}

export default Staff;
