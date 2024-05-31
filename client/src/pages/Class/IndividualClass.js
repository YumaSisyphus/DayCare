import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Colors } from "../../utils/colors";
import DashboardBg from "../../images/geometricbg.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useAuth } from "../../utils/authContext";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

const SingleClass = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { authState, loading } = useAuth();
  const handleLogout = useLogout();
  const [modalOpen, setModalOpen] = useState(false);

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
    fetch(`/class/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setClassData(data))
      .catch((error) => console.error("Error fetching class details:", error));
  }, [id]);

  useEffect(() => {
    fetch(`/children/getChildren`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setChildren(data))
      .catch((error) => console.error("Error fetching children:", error));
  }, [id]);

  if (!classData) {
    return <Typography>Loading...</Typography>;
  }

  const handleAssignChildren = () => {
    fetch("/assignChild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ClassId: parseInt(id),
        ChildIds: selectedChildren,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        fetch(`/class/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setClassData(data);
          })
          .catch((error) =>
            console.error("Error fetching class details:", error)
          );
      })
      .catch((error) => console.error("Error assigning children:", error));
  };

  const handleToggleActiveStatus = (childId, currentActiveStatus) => {
    const newActiveStatus = currentActiveStatus === 1 ? 0 : 1;

    fetch(`/children/updateChildActiveStatus/${childId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: newActiveStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        fetch(`/class/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setClassData(data);
          })
          .catch((error) =>
            console.error("Error fetching class details:", error)
          );
      })
      .catch((error) =>
        console.error("Error updating child active status:", error)
      );
  };

  const handleRemoveChildFromClass = (childId) => {
    fetch("/class/removeChildFromClass", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        childId: parseInt(childId),
        classId: parseInt(id),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        fetch(`/class/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setClassData(data);
          })
          .catch((error) =>
            console.error("Error fetching class details:", error)
          );
      })
      .catch((error) =>
        console.error("Error removing child from class:", error)
      );
  };

  return (
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
      <Box width={"70%"}>
        <Typography variant="h4">{classData.Name}</Typography>
        <Typography variant="body1">
          Age Group: {classData.AgeGroupName}
        </Typography>
        <Typography variant="body1">Teacher: {classData.StaffName}</Typography>
        {/* <Button onClick={handleOpen}>+</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Children To Class</DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="select-multiple-children-label">
                Select Children
              </InputLabel>
              <Select
                labelId="select-multiple-children-label"
                id="select-multiple-children"
                multiple
                value={selectedChildren}
                onChange={(event) => setSelectedChildren(event.target.value)}
                inputProps={{ "aria-label": "Select Children" }}
              >
                {children.map((child) => (
                  <MenuItem key={child.ChildId} value={child.ChildId}>
                    {child.ChildName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAssignChildren} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog> */}

        <Typography variant="h6" sx={{ marginTop: 7 }}>
          Children:
        </Typography>
        {classData.Children && classData.Children.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              marginTop: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Child Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Attendance</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Gender</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"} sx={{ textAlign: "right" }}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classData.Children.map((child) => (
                  <TableRow key={child.ChildId}>
                    <TableCell>{child.ChildName}</TableCell>
                    <TableCell>
                      {child.Active === 1 ? "Active" : "Not Active"}
                    </TableCell>
                    <TableCell>{child.Gender}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      <IconButton
                        onClick={() =>
                          handleToggleActiveStatus(child.ChildId, child.Active)
                        }
                      >
                        {child.Active === 1 ? (
                          <PersonRemoveIcon />
                        ) : (
                          <PersonAddAlt1Icon />
                        )}
                      </IconButton>
                      {/* <IconButton
                        onClick={() =>
                          handleRemoveChildFromClass(child.ChildId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2">
            No children assigned to this class.
          </Typography>
        )}
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default SingleClass;
