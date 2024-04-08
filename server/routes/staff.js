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


router.get("/getStaff", (req, res) => {
    const sql = "SELECT * FROM staff";
    db.query(sql, [], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Fetch staff failed" });
      } else {
        return res.json({
          success: true,
          message: "Fetch staff succesful",
          data,
        });
      }
    });
});

router.get("/getStaffId", (req, res) => {
    const sql = "SELECT * FROM staff WHERE StaffId=?";
    const values = [req.body.id];
    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Fetch food failed" });
      } else {
        return res.json({
          success: true,
          message: "Fetch food succesful",
          data,
        });
      }
    });
  });

  router.put("/updateStaff/:id", (req, res) => {
    const { id } = req.params;
    const { Name, Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password } = req.body;
  
    const query =
      "UPDATE staff SET Name = ?, Surname = ?, Birthday = ?, Gender = ?, Email = ?, PhoneNumber = ?, Role = ?, Username = ?, Address = ?, Password = ? WHERE StaffId = ?";
  
    db.query(query, [Name,  Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password, id], (err, result) => {
      if (err) {
        console.error("Error updating staff:", err);
        return res
          .status(500)
          .json({ message: "Error updating staff", error: err });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: "Staff updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        return res.status(404).json({ message: "Staff not found" });
      }
    });
  });

  router.post("/createStaff", (req, res) => {
    const { Name, Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password } = req.body;
  
    const query =
      "INSERT INTO staff (Name, Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
    db.query(query, [Name, Surname, Birthday, Gender, Email, PhoneNumber, Role, Username, Address, Password], (err, result) => {
      if (err) {
        console.error("Error adding new staff:", err);
        return res
          .status(500)
          .json({ message: "Error adding new staff", error: err });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: "Staff added successfully",
          newStaff: {
            StaffId: result.insertId,
            Name: Name,
            Surname: Surname,
            Birthday: Birthday,
            Gender: Gender,
            Email: Email,
            PhoneNumber: PhoneNumber,
            Role: Role,
            Username: Username, 
            Address: Address,
            Password: Password,

          },
        });
      } else {
        return res.status(400).json({ message: "Failed to add new staff" });
      }
    });
  });

  router.delete("/deleteStaff/:staffId", (req, res) => {
    const deleteStaffSql = "DELETE FROM Staff WHERE StaffId=?";
  
    const values = [req.params.staffId];
  
    db.query(deleteStaffSql, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Delete staff failed" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Delete staff successful" });
      }
    });
  });
  
  module.exports = router;
