const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.use(express.json());
router.use(cookieParser());

const secretKey = crypto.randomBytes(64).toString("hex");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.post("/", (req, res) => {
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

module.exports = router;
