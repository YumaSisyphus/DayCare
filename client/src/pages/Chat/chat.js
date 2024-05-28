import React, { useState, useEffect } from "react";
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

const socket = io("http://localhost:7000"); // Connect to your backend WebSocket server

const Chat = () => {
  const [messages, setMessages] = useState([]); // Ensure messages is initialized as an array
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // State to store recipient's ID
  const [filteredMessages, setFilteredMessages] = useState([]); // State to store filtered messages
  const [users, setUsers] = useState([]);
  const { authState } = useAuth();
  const senderId = authState.user ? authState.user.id : null;
  const senderRole = authState.user ? authState.user.userType : null; // Assuming role is included in user data

  useEffect(() => {
    // Fetch users based on role
    const fetchUsers = async () => {
      try {
        let response;
        if (senderRole === "parent") {
          response = await axios.get("http://localhost:7000/staff/getStaff");
        } else if (senderRole === "Teacher") {
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

    // Event listener for receiving messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Cleanup on unmount
      socket.off("receive_message");
    };
  }, [senderRole]);

  useEffect(() => {
    // Filter messages based on the selected recipient
    if (recipientId && Array.isArray(messages)) {
      const filtered = messages.filter(
        (msg) =>
          (msg.sender_id === senderId && msg.recipient_id === recipientId) ||
          (msg.sender_id === recipientId && msg.recipient_id === senderId)
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]); // Clear filtered messages if no recipient is selected
    }
  }, [messages, recipientId, senderId]);

  // Function to handle sending messages
  const sendMessage = () => {
    if (!recipientId || !newMessage || !senderId) return;
    // Emit send_message event to server
    socket.emit("send_message", {
      sender_id: senderId,
      recipient_id: recipientId,
      message: newMessage,
    });

    // Add sent message to UI
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender_id: senderId, recipient_id: recipientId, message: newMessage },
    ]);
    setNewMessage("");
  };

  // Function to load messages with the selected recipient from the server
  const loadMessages = async (recipientId) => {
    try {
      const response = await axios.get(`/chat/messages/${recipientId}`, {
        params: { senderId },
      });
      setMessages(response.data); // Directly set the array of messages
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  // Function to handle recipient selection
  const handleRecipientChange = (e) => {
    const selectedRecipientId = e.target.value;
    setRecipientId(selectedRecipientId);
    loadMessages(selectedRecipientId);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
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
        <List style={{ maxHeight: 300, overflow: "auto", marginBottom: 20 }}>
          {filteredMessages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={msg.sender_id === senderId ? "You" : msg.sender_id}
                secondary={msg.message}
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          fullWidth
        >
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default Chat;
