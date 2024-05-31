import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../utils/authContext";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Colors } from "../../utils/colors";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

// Ensure the socket connection is established outside the component to avoid multiple connections
const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const { authState, loading } = useAuth();
  const senderId = authState.user ? authState.user.id : null;
  const senderRole = authState.user ? authState.user.userType : null;
  const [isHovered, setIsHovered] = useState(false);
  const [senderUsername, setSenderUsername] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const SVGIcon = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        style={{
          animation: isHovered ? "slide-8 0.2s forwards" : "none",
        }}
      >
        <style>
          {`
          @keyframes slide-8 {
            to {
              transform: translateY(-2px);
            }
          }
        `}
        </style>
        <path
          fill="#0A0A30"
          fillRule="evenodd"
          d="M17.358 11.368a.714.714 0 00-.092-1.006L12.99 6.798a.71.71 0 00-.778-.102.708.708 0 00-.155.102L7.78 10.362a.714.714 0 10.915 1.097l3.078-2.565v7.731a.75.75 0 001.5 0v-7.73l3.079 2.564a.714.714 0 001.006-.091z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const typingTimeout = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `/chat/messagesUsername/${senderId}/${senderRole}`
        );
        setSenderUsername(response.data.data[0].Username);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (!loading) {
      fetchUserName();
    }
  }, [senderId, senderRole, loading, authState]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (senderRole === "parent") {
          response = await axios.get("http://localhost:5000/staff/getStaff");
        } else if (senderRole === "staff") {
          response = await axios.get(
            "http://localhost:5000/parents/getParents"
          );
        }

        if (response && response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("typing", ({ senderId }) => {
      setTypingUser(senderId);
    });

    socket.on("stop_typing", ({ senderId }) => {
      setTypingUser(null);
    });

    if (senderId) {
      socket.emit("authenticate", senderId);
    }

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [messages, senderId, senderRole]);

  const sendMessage = () => {
    if (!recipientId || !newMessage) return;

    socket.emit("send_message", {
      senderId,
      recipientId,
      message: newMessage,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId, recipientId, message: newMessage },
    ]);
    setNewMessage("");
    stopTyping();
  };

  const loadMessages = async (recipientId) => {
    try {
      const response = await axios.get(`/chat/messages/${recipientId}`, {
        params: { senderId },
      });
      const fetchedMessages = response.data.map((msg) => ({
        ...msg,
        senderId: msg.sender_id,
        recipientId: msg.recipient_id,
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  useEffect(() => {
    if (recipientId) {
      loadMessages(recipientId);
    }
  }, [recipientId]);

  const handleRecipientChange = (e) => {
    const selectedRecipientId = e.target.value;
    setRecipientId(selectedRecipientId);
    loadMessages(selectedRecipientId);
  };

  const handleTyping = () => {
    if (!typingTimeout.current) {
      socket.emit("typing", { senderId, recipientId });
      typingTimeout.current = setTimeout(() => {
        socket.emit("stop_typing", { senderId, recipientId });
        typingTimeout.current = null;
      }, 3000);
    }
  };

  const stopTyping = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
      socket.emit("stop_typing", { senderId, recipientId });
      typingTimeout.current = null;
    }
  };

  const getUsernameById = (id) => {
    if (id === senderId) {
      return senderUsername;
    }
    const user = users.find(
      (user) => user.StaffId === id || user.ParentId === id
    );
    return user ? user.Username : "Unknown User";
  };

  return (
    <Box
      display={"flex"}
      minHeight={"100vh"}
      borderTop={`1px solid ${Colors.cleanLightBlack}`}
      sx={{
        background: `linear-gradient(274deg, rgba(254,213,198,1) 0%, rgba(255,243,229,1) 70%, rgba(140,163,232,1) 100%)`,
      }}
    >
      <Box
        style={{
          padding: 20,
          width: "20%",
          background: "rgba(255, 255, 255, 0.17)",
          border: "1px solid rgba(255, 255, 255, 0.27)",
        }}
        minHeight={"100%"}
        position={"relative"}
        sx={{
          backgroundColor: Colors.primary,
          borderRight: `2px solid ${Colors.pastelPurple}`,
        }}
      >
        <Box position={"fixed"} top={"12%"} width={"15%"}>
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel id="recipient-label">Select User</InputLabel>
            <Select
              id="recipient-label"
              label="Recipient"
              value={recipientId}
              onChange={handleRecipientChange}
              variant="outlined"
            >
              {users.map((user) => (
                <MenuItem
                  key={senderRole === "parent" ? user.StaffId : user.ParentId}
                  value={senderRole === "parent" ? user.StaffId : user.ParentId}
                >
                  {user.Username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        width={"80%"}
        style={{
          background: "rgba(255, 255, 255, 0.17)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.27)",
        }}
        minHeight={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        pb={10}
      >
        <List
          style={{ height: "100%", overflow: "auto", marginBottom: 20, pl: 5 }}
        >
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  msg.senderId === senderId
                    ? "flex-end"
                    : msg.senderId === recipientId
                    ? "flex-start"
                    : "",
              }}
            >
              <ListItemText
                primary={getUsernameById(msg.senderId)}
                secondary={msg.message}
                style={{
                  background: "rgba(255, 255, 255, 0.17)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.4px)",
                  WebkitBackdropFilter: "blur(4.4px)",
                  border: "1px solid rgba(255, 255, 255, 0.27)",
                }}
                sx={{
                  bgcolor: Colors.pastelBlue,
                  padding: 1.5,
                  maxWidth: "400px",
                  borderRadius: 5,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
          {typingUser && (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Typing..."
                sx={{
                  fontStyle: "italic",
                  color: Colors.pastelPurple,
                }}
              />
            </ListItem>
          )}
        </List>
        <Box
          display={"flex"}
          position={"fixed"}
          bottom={0}
          width={"75vw"}
          right={0}
          gap={4}
          pb={2}
          pr={2}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleTyping}
            sx={{
              background: "rgba(255, 255, 255, 0.17)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4.4px)",
              WebkitBackdropFilter: "blur(4.4px)",
              borderRadius: 5,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input": {
                "&:focus": {
                  outline: "none",
                },
              },
            }}
            size="small"
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={sendMessage}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              width: "5%",
              p: 1,
              borderRadius: "5px",
              border: `1px solid ${Colors.pastelPeach}`,
              bgcolor: Colors.pastelPeach,
            }}
            size="small"
          >
            <SVGIcon />
          </Button>
        </Box>
      </Box>
      <SessionModal open={modalOpen} />
    </Box>
  );
};

export default Chat;
