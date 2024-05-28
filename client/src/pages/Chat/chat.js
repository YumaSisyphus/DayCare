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
import { Colors } from "../../utils/colors";

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
    if (!recipientId || !newMessage) return;

    socket.emit("send_message", {
      senderId,
      recipientId,
      message: newMessage,
    });

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

  useEffect(() => {
    loadMessages(recipientId);
  }, []);

  // Function to handle recipient selection
  const handleRecipientChange = (e) => {
    const selectedRecipientId = e.target.value;
    setRecipientId(selectedRecipientId);
    loadMessages(selectedRecipientId);
  };

  return (
    <Box
      display={"flex"}
      minHeight={"92vh"}
      borderTop={`1px solid ${Colors.cleanLightBlack}`}
    >
      <Box
        style={{ padding: 20, width: "20%" }}
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
      >
        <List style={{ height: "100%", overflow: "auto", marginBottom: 20 }}>
          {filteredMessages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={msg.sender_id === senderId ? "You" : msg.sender_id}
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
        </List>
        <Box display={"flex"}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ backgroundColor: Colors.white }}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ width: "10%" }}
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
