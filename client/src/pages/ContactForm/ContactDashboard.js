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
import SessionModal from "../../components/SessionModal";
import useLogout from "../../utils/useLogout";
import useCheckAuth from "../../utils/useCheckAuth";

function ContactForm() {
  const [contactforms, setContactForms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedContactForm, setSelectedContactForm] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editedDateCreated, setEditedDateCreated] = useState("");
  const [editedSubject, setEditedSubject] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isNewContactForm, setIsNewContactForm] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useCheckAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading && !authState.isAuthenticated && authState.isRefreshToken) {
      handleOpenModal();
    } else if (!loading && !authState.isRefreshToken) {
      handleLogout();
    }
  }, [loading, authState]);

  useEffect(() => {
    fetch("/contactform/getContactForm")
      .then((response) => response.json())
      .then((data) => setContactForms(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddNew = () => {
    setSelectedContactForm(null);
    setEditedEmail("");
    setEditedMessage("");
    setEditedDateCreated("");
    setEditedSubject("");
    setIsNewContactForm(true);
    setOpenModal(true);
  };

  const handleEdit = (contactform) => {
    setSelectedContactForm(contactform);
    setEditedEmail(contactform.Email);
    setEditedMessage(contactform.Message);
    setEditedDateCreated(contactform.DateCreated);
    setEditedSubject(contactform.Subject);
    setIsNewContactForm(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveChanges = () => {
    const apiUrl = isNewContactForm
      ? "/contactform/createContactForm"
      : `/contactform/updateContactForm/${selectedContactForm.ContactFormId}`;

    const method = isNewContactForm ? "POST" : "PUT";

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: editedEmail,
        Message: editedMessage,
        DateCreated: editedDateCreated,
        Subject: editedSubject,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (
          data.message === "Contact added successfully" ||
          data.message === "Contact updated successfully"
        ) {
          if (isNewContactForm) {
            setContactForms([...contactforms, data.newContactForm]);
          } else {
            setContactForms(
              contactforms.map((contactform) =>
                contactform.ContactFormId === selectedContactForm.ContactFormId
                  ? {
                      ...contactform,
                      Email: editedEmail,
                      Message: editedMessage,
                      DateCreated: editedDateCreated,
                      Subject: editedSubject,
                    }
                  : contactform
              )
            );
          }
          setOpenModal(false);
        } else {
          setSnackbarMessage("Error updating or adding contact");
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error updating or adding contact:", error);
        setSnackbarMessage("Error updating or adding contact");
        setSnackbarOpen(true);
      });
  };

  const handleDelete = (ContactFormId) => {
    fetch(`contactform/deleteContactForm/${ContactFormId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage(data.message);
        setSnackbarOpen(true);
        if (data.success) {
          setContactForms(
            contactforms.filter(
              (contactform) => contactform.ContactFormId !== ContactFormId
            )
          );
        }
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardSidebar />
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
              Contact Form Dashboard
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
                    <Typography fontWeight={"bold"}>Email</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Message</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Date Created</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Subject</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? contactforms.slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                  : contactforms
                ).map((contactform) => (
                  <TableRow key={contactform.ContactFormId}>
                    <TableCell>
                      <Typography variant="body1">
                        {contactform.Email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {" "}
                        {contactform.Message}{" "}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {contactform.DateCreated}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {contactform.Subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(contactform)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        onClick={() => handleDelete(contactform.ContactFormId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(contactforms.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
          <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>
              {isNewContactForm ? "Add New Contact" : "Edit Contact"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                label="Email"
                fullWidth
                value={editedEmail}
                onChange={(c) => setEditedEmail(c.target.value)}
              />
              <TextField
                margin="normal"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={editedMessage}
                onChange={(c) => setEditedMessage(c.target.value)}
              />

              <TextField
                margin="normal"
                label="DateCreated"
                fullWidth
                value={editedDateCreated}
                onChange={(c) => setEditedDateCreated(c.target.value)}
              />
              <TextField
                margin="normal"
                label="Subject"
                fullWidth
                value={editedSubject}
                onChange={(c) => setEditedSubject(c.target.value)}
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
      <SessionModal open={modalOpen} />
    </ThemeProvider>
  );
}
export default ContactForm;
