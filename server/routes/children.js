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

router.get("/getChildren", (req, res) => {
  const sql = "SELECT * FROM child";
  db.query(sql, [], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch children failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch children succesful",
        children:data,
      });
    }
  });
});

router.get("/getChild", (req, res) => {
  const sql = "SELECT * FROM child WHERE ChildId=?";
  const values = [req.body.childId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch child failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch child succesful",
        child:data,
      });
    }
  });
});

router.delete("/deleteChild/:id", (req, res) => {
  const sql = "DELETE FROM child WHERE ChildId=?";
  const values = [req.params.id];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Delete child failed" });
    } else {
      return res.json({
        success: true,
        message: "Delete child succesful",
      });
    }
  });
});

router.post("/createChild", (req, res) => {
  const sql =
    "INSERT INTO child (Birthday, Gender, Photo, Allergies, Vaccines, Name, Surname, Payments, Active) VALUES (?)";
  const values = [
    req.body.birthday,
    req.body.gender,
    req.body.photo,
    req.body.allergies,
    req.body.vaccines,
    req.body.name,
    req.body.surname,
    req.body.payments,
    req.body.active,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Create child failed" });
    } else {
      return res.json({
        success: true,
        message: "Create child succesful",
      });
    }
  });
});

router.put("/updateChild", (req, res) => {
  const sql =
    "UPDATE child SET Birthday=?, Gender=?, Photo=?, Allergies=?, Vaccines=?, Name=?, Surname=?, Payments=? WHERE ChildId=?";
  const values = [
    req.body.birthday,
    req.body.gender,
    req.body.photo,
    req.body.allergies,
    req.body.vaccines,
    req.body.name,
    req.body.surname,
    req.body.payments,
    req.body.active,
    req.body.childId,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Update child failed" });
    } else {
      return res.json({
        success: true,
        message: "Update child successful",
      });
    }
  });
});

module.exports = router;
