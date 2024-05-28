// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app); // Use HTTP server with Express
const io = require("socket.io")(http); // Initialize Socket.IO with HTTP server
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mysql = require("mysql2");
const mongoose = require("mongoose");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://butritnreqica:EwKrYj7B9y586W1G@cluster0.ufzgp4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", //"mongodb://localhost:27017/daycare"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const loginRoutes = require("./routes/login");
const childrenRoutes = require("./routes/children");
const parentsRoutes = require("./routes/parents");
const activityRoutes = require("./routes/activity");
const foodRoutes = require("./routes/food");
const classRoutes = require("./routes/class");
const ageGroupRoutes = require("./routes/agegroup");
const mealRoutes = require("./routes/meal");
const staffRoutes = require("./routes/staff");
const contactformRoutes = require("./routes/contactform");
const paymentRoutes = require("./routes/payment");
const chatRoutes = require("./routes/chat");

app.use("/login", loginRoutes);
app.use("/children", childrenRoutes);
app.use("/parents", parentsRoutes);
app.use("/activity", activityRoutes);
app.use("/food", foodRoutes);
app.use("/class", classRoutes);
app.use("/agegroup", ageGroupRoutes);
app.use("/meal", mealRoutes);
app.use("/staff", staffRoutes);
app.use("/contactform", contactformRoutes);
app.use("/payment", paymentRoutes);
app.use("/chat", chatRoutes);

// Maintain a map of socket connections for each user
const userSockets = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle user authentication
  socket.on("authenticate", (userId) => {
    console.log(`User ${userId} authenticated`);
    userSockets[userId] = socket;
  });

  // Handle receiving messages
  socket.on("send_message", (data) => {
    const { senderId, recipientId, message } = data;

    // Send message to the recipient's socket
    if (userSockets[recipientId]) {
      userSockets[recipientId].emit("receive_message", {
        senderId,
        message,
      });
    }

    const query =
      "INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)";
    db.query(query, [senderId, recipientId, message], (error, results) => {
      if (error) {
        console.error("Error sending message:", error);
        return;
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Remove the socket from userSockets map on disconnect
    const userId = Object.keys(userSockets).find(
      (key) => userSockets[key] === socket
    );
    if (userId) {
      delete userSockets[userId];
      console.log(`User ${userId} disconnected`);
    }
  });
});
const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});