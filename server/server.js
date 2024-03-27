const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

const secretKey = crypto.randomBytes(64).toString("hex");

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM staff WHERE Username = ? AND Password = ?";
  const values = [req.body.username, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Login Failed" });
    }

    if (data && data.length > 0) {
      const token = jwt.sign(
        {
          userId: data[0].id,
          username: data[0].Username,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });

      return res.json({
        success: true,
        message: "Login Successful",
        token: token,
        user: data[0],
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
