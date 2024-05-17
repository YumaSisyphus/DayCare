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
  const { username, password } = req.body;

  // Check in staff table
  const staffSql = "SELECT * FROM staff WHERE Username = ? AND Password = ?";
  const staffValues = [username, password];

  db.query(staffSql, staffValues, (staffErr, staffData) => {
    if (staffErr) {
      console.error("Staff database error:", staffErr);
      return res.json({ success: false, message: "Login Failed" });
    }

    if (staffData && staffData.length > 0) {
      const token = jwt.sign(
        {
          userId: staffData[0].id,
          username: staffData[0].Username,
          userType: "staff",
          role: staffData[0].Role,
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
      });
    } else {
      // Check in parent table
      const parentSql =
        "SELECT * FROM parent WHERE Username = ? AND Password = ?";
      const parentValues = [username, password];

      db.query(parentSql, parentValues, (parentErr, parentData) => {
        if (parentErr) {
          console.error("Parent database error:", parentErr);
          return res.json({ success: false, message: "Login Failed" });
        }

        if (parentData && parentData.length > 0) {
          const token = jwt.sign(
            {
              userId: parentData[0].id,
              username: parentData[0].Username,
              userType: "parent",
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
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid username or password",
          });
        }
      });
    }
  });
});

router.get("/auth/status", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      res.json({
        isAuthenticated: true,
        user: {
          id: decoded.userId,
          username: decoded.username,
          userType: decoded.userType,
          role: decoded.role,
        },
      });
    } catch (err) {
      res.json({ isAuthenticated: false, user: null });
    }
  } else {
    res.json({ isAuthenticated: false, user: null });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logout successful" });
});

module.exports = router;
