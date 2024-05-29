const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

router.use(express.json());
router.use(cookieParser());

const secretKey = process.env.SECRET_KEY;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Check in staff table
  const staffSql = "SELECT * FROM staff WHERE Username = ? Or Email = ?";
  const staffValues = [username, username];

  db.query(staffSql, staffValues, (staffErr, staffData) => {
    if (staffErr) {
      console.error("Staff database error:", staffErr);
      return res.json({ success: false, message: "Login Failed" });
    }
    if (staffData && staffData.length > 0) {
      bcrypt.compare(password, staffData[0].Password, (err, isMatch) => {
        if (isMatch) {
          const accessToken = jwt.sign(
            {
              userId: staffData[0].StaffId,
              username: staffData[0].Username,
              userType: "staff",
              role: staffData[0].Role,
            },
            secretKey,
            { expiresIn: "1h" }
          );

          const refreshToken = jwt.sign(
            {
              userId: staffData[0].StaffId,
              username: staffData[0].Username,
              userType: "staff",
              role: staffData[0].Role,
            },
            refreshTokenSecretKey,
            { expiresIn: "7d" }
          );

          res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 604800000, // 7 days
          });

          return res.json({
            success: true,
            message: "Login Successful",
            token: accessToken,
            user: {
              id: staffData[0].StaffId,
              username: staffData[0].Username,
              role: staffData[0].Role, // This line is important
              userType: "staff",
            },
          });
        } else if (err) {
          console.error("Error during log in:" + err);
        } else {
          return res.json({
            success: false,
            message: "Invalid username or password",
          });
        }
      });
    } else {
      // Check in parent table
      const parentSql = "SELECT * FROM parent WHERE Username = ? Or Email = ?";
      const parentValues = [username, username];

      db.query(parentSql, parentValues, (parentErr, parentData) => {
        if (parentErr) {
          console.error("Parent database error:", parentErr);
          return res.json({ success: false, message: "Login Failed" });
        }

        if (parentData && parentData.length > 0) {
          bcrypt.compare(password, parentData[0].Password, (err, isMatch) => {
            if (isMatch) {
              const accessToken = jwt.sign(
                {
                  userId: parentData[0].ParentId,
                  username: parentData[0].Username,
                  role: "parent", // This line is important
                  userType: "parent",
                },
                secretKey,
                { expiresIn: "1h" }
              );

              const refreshToken = jwt.sign(
                {
                  userId: parentData[0].ParentId,
                  username: parentData[0].Username,
                  role: "parent", // This line is important
                  userType: "parent",
                },
                refreshTokenSecretKey,
                { expiresIn: "7d" }
              );

              res.cookie("token", accessToken, {
                httpOnly: true,
                maxAge: 3600000, // 1 hour  3600000
              });

              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 604800000, // 7 days
              });

              return res.json({
                success: true,
                message: "Login Successful",
                token: accessToken,
                user: {
                  id: parentData[0].ParentId,
                  username: parentData[0].Username,
                  role: "parent", // This line is important
                  userType: "parent",
                },
              });
            } else if (err) {
              console.error("Error during log in:" + err);
            } else {
              return res.json({
                success: false,
                message: "Invalid username or password",
              });
            }
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
  const refreshToken = req.cookies.refreshToken;
  if (token && refreshToken) {
    try {
      const decoded = jwt.verify(token, secretKey);
      res.json({
        isAuthenticated: true,
        isRefreshToken: true,
        user: {
          id: decoded.userId,
          username: decoded.username,
          userType: decoded.userType,
          role: decoded.role,
        },
      });
    } catch (err) {
      console.error("Token verification error:", err);
      res.json({ isAuthenticated: false, isRefreshToken: false, user: null });
    }
  } else if (!token && refreshToken) {
    res.json({ isAuthenticated: false, isRefreshToken: true, user: null });
  } else {
    res.json({ isAuthenticated: false, isRefreshToken: false, user: null });
  }
});

router.post("/token/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, refreshTokenSecretKey);
      const newAccessToken = jwt.sign(
        {
          userId: decoded.userId,
          username: decoded.username,
          userType: decoded.userType,
          role: decoded.role,
        },
        secretKey,
        { expiresIn: "1h" }
      );

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      });

      res.json({
        success: true,
        message: "Token Refreshed",
        token: newAccessToken,
      });
    } catch (err) {
      console.error("Refresh token verification error:", err);
      res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }
  } else {
    res
      .status(403)
      .json({ success: false, message: "No refresh token provided" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logout successful" });
});

module.exports = router;
