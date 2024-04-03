const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.use(express.json());
router.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.get("/getParents", (req, res) => {
  const sql = "SELECT * FROM parent";
  db.query(sql, [], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch parents failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch parents succesful",
        data,
      });
    }
  });
});

router.get("/getParent", (req, res) => {
  const sql = "SELECT * FROM parent WHERE ParentId=?";
  const values = [req.body.parentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch parent succesful",
        data,
      });
    }
  });
});

router.delete("/deleteParent/:parentId", (req, res) => {
  const sql = "DELETE FROM parent WHERE ParentId=?";
  const values = [req.params.parentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Delete parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Delete parent succesful",
      });
    }
  });
});


router.post("/createParent", (req, res) => {
  const sql =
    "INSERT INTO parent (Name, Surname,Birthday, Gender,Email, Address, PhoneNumber, Username, Password, Active) VALUES (?)";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.birthday,
    req.body.gender,
    req.body.email,
    req.body.address,
    req.body.phonenumber,
    req.body.username,
    req.body.password,
    req.body.active,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Create parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Create parent succesful",
        test:data[0]
      });
    }
  });
});

router.put("/updateParent", (req, res) => {
    const sql =
      "UPDATE parent SET  Name=?, Surname=?, Birthday=?, Gender=?, Email=?, Address=?, PhoneNumber=?, Username=?, Password=?, Active=? WHERE ParentId=?";
    const values = [
      req.body.name,
      req.body.surname,
      req.body.birthday,
      req.body.gender,
      req.body.email,
      req.body.address,
      req.body.phonenumber,
      req.body.username,
      req.body.password,
      req.body.active,
      req.body.parentId
    ];
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Update parent failed" });
      } else {
        return res.json({
          success: true,
          message: "Update parent successful",
        });
      }
    });
});

module.exports = router;
