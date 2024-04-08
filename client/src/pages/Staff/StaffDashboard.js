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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../utils/colors";
import { theme } from "../../utils/theme";
import DashboardBg from "../../images/geometricbg.png";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
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
    const apiUrl = isNewStaff
      ? "/staff/createStaff"
      : `/staff/updateStaff/${selectedStaff.StaffId}`;

    const method = isNewStaff ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save changes");
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
        setSnackbarMessage("Error updating or adding staff");
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

  return (
    <ThemeProvider theme={theme}>
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
        <Container>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" gutterBottom>
              Staff Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{ height: "20%" }}
            >
              Add New
            </Button>
          </Box>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                backdropFilter: "blur(10px)",
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
                      <Typography fontWeight={"bold"}>Username</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Address</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Password</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Actions</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffList.map((member) => (
                    <TableRow key={member.StaffId}>
                      <TableCell>
                        <Typography variant="body1">{member.Name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Surname}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Birthday}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Gender}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.PhoneNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Username}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Address}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{member.Password}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          onClick={() => handleEdit(member)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="delete"
                          onClick={() => handleDelete(member.StaffId)}
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

          <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>
              {isNewStaff ? "Add New Staff" : "Edit Staff"}
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
              <TextField
                margin="normal"
                label="Birthday"
                type="date"
                fullWidth
                value={editedBirthday}
                onChange={(e) => setEditedBirthday(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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
                label="Phone Number"
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
                label="Username"
                fullWidth
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
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
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
              >
                Close
              </Button>
            }
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Staff;
