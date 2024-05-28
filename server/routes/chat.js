// chatRoutes.js

const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.post("/send", (req, res) => {
  const { senderId, recipientId, message } = req.body;

  // Send message to recipient's socket
  if (userSockets[recipientId]) {
    userSockets[recipientId].emit("receive_message", {
      sender_id,
      message,
    });
  }

  // Save the message to the database
  const query =
    "INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)";
  db.query(query, [senderId, recipientId, message], (error, results) => {
    if (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
    res.status(200).json({ message: "Message sent successfully" });
  });
});

router.get("/messages/:recipientId", (req, res) => {
  const senderId = req.query.senderId; // Assuming senderId is passed as a query parameter
  const recipientId = req.params.recipientId;

  const query = `
      SELECT * FROM messages 
      WHERE (sender_id = ? AND recipient_id = ?)
         OR (sender_id = ? AND recipient_id = ?)`;

  db.query(
    query,
    [senderId, recipientId, recipientId, senderId],
    (error, results) => {
      if (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Failed to fetch messages" });
      }
      res.status(200).json(results);
    }
  );
});

router.get("/messages/:recipientId", (req, res) => {
  const { senderId } = req.query;
  const { recipientId } = req.params;
  const sql = `
      SELECT * FROM messages 
      WHERE (sender_id = ? AND recipient_id = ?) 
      OR (sender_id = ? AND recipient_id = ?)`;
  db.query(sql, [senderId, recipientId, recipientId, senderId], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Fetch messages failed" });
    } else {
      return res.json({ success: true, data });
    }
  });
});

module.exports = router;
