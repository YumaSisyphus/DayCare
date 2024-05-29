import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../../utils/authContext";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Colors } from "../../utils/colors";

// Ensure the socket connection is established outside the component to avoid multiple connections
const socket = io("http://localhost:7000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const { authState } = useAuth();
  const senderId = authState.user ? authState.user.id : null;
  const senderRole = authState.user ? authState.user.userType : null;

  const typingTimeout = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (senderRole === "parent") {
          response = await axios.get("http://localhost:7000/staff/getStaff");
        } else if (senderRole === "staff") {
          response = await axios.get(
            "http://localhost:7000/parents/getParents"
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
      console.log(messages);
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
  }, [filteredMessages, messages, senderId, senderRole]);

  const filterMessages = () => {
    if (recipientId && Array.isArray(messages)) {
      const filtered = messages.filter(
        (msg) =>
          (msg.sender_id === senderId && msg.recipient_id === recipientId) ||
          (msg.sender_id === recipientId && msg.recipient_id === senderId)
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]);
    }
  };

  useEffect(() => {
    filterMessages();
  }, [messages, recipientId, senderId]);

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
    filterMessages();
  };

  const loadMessages = async (recipientId) => {
    try {
      const response = await axios.get(`/chat/messages/${recipientId}`, {
        params: { senderId },
      });
      setMessages(response.data);
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

  return (
    <Box
      display={"flex"}
      minHeight={"100vh"}
      borderTop={`1px solid ${Colors.cleanLightBlack}`}
    >
      <Box
        style={{ padding: 20, width: "20%" }}
        position={"fixed"}
        top={"7%"}
        minHeight={"100%"}
        sx={{
          backgroundColor: Colors.primary,
          borderRight: `2px solid ${Colors.pastelPurple}`,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chat
        </Typography>
        <FormControl fullWidth style={{ marginBottom: 20 }}>
          <InputLabel id="recipient-label">Select User</InputLabel>
          <Select
            labelId="recipient-label"
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
      <Box
        width={"80%"}
        bgcolor={Colors.primary}
        minHeight={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        ml={"22.2%"}
        pb={10}
      >
        <List
          style={{ height: "100%", overflow: "auto", marginBottom: 20, pl: 5 }}
        >
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={msg.sender_id}
                secondary={msg.message}
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
        <Box display={"flex"} position={"fixed"} bottom={0} width={"80%"}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleTyping}
            style={{ backgroundColor: Colors.white }}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ width: "15%" }}
            size="small"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
