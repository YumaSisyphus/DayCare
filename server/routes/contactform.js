const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.get("/getContactForm", (req, res) => {
    const sql = "SELECT * FROM contactform";
    db.query(sql, [], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Fetch contact data failed" });
      } else {
        return res.json({
          success: true,
          message: "Fetch contact data succesful",
          data,
        });
      }
    });
  });

  router.get("/getContactFormId", (req, res) => {
    const sql = "SELECT * FROM contactform WHERE ContactFormId=?";
    const values = [req.body.id];
    db.query(sql, [values], (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ success: false, message: "Fetch contact data failed" });
      } else {
        return res.json({
          success: true,
          message: "Fetch contact data succesful",
          data,
        });
      }
    });
  });

  router.put("/updateContactForm/:id", (req, res) => {
    const { id } = req.params;
    const { Email, Message, DateCreated, Subject } = req.body;
  
    const query =
      "UPDATE contactform SET Email = ?, Message = ?, DateCreated = ?, Subject = ? WHERE ContactFormId = ?";
  
    db.query(query, [Email, Message, DateCreated, Subject, id], (err, result) => {
      if (err) {
        console.error("Error updating contact form:", err);
        return res
          .status(500)
          .json({ message: "Error updating contact form", error: err });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: "Contact form updated successfully",
          affectedRows: result.affectedRows,
        });
      } else {
        return res.status(404).json({ message: "Contact form not found" });
      }
    });
  });

router.post("/createContactForm", (req, res) => {
    const { Email, Message, DateCreated, Subject } = req.body;
  
    const query =
      "INSERT INTO contactform (Email, Message, DateCreated, Subject) VALUES (?, ?, ?, ?)";
  
    db.query(query, [Email, Message, DateCreated, Subject], (err, result) => {
      if (err) {
        console.error("Error adding new contact:", err);
        return res
          .status(500)
          .json({ message: "Error adding new contact", error: err });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: "Contact added successfully",
          newContactForm: {
            ContactFormId: result.insertId,
            Email: Email,
            Message: Message,
            DateCreated: DateCreated,
            Subject: Subject
          },
        });
      } else {
        return res.status(400).json({ message: "Failed to add new contact" });
      }
    });
  });

  
  router.delete("/deleteContactForm/:ContactFormId", (req, res) => {
    const deleteContactFormSql = "DELETE FROM contactform WHERE ContactFormId=?";
  
    const values = [req.params.ContactFormId];
  
    db.query(deleteContactFormSql, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Delete contact failed" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Delete contact successful" });
      }
    });
  });

  module.exports = router;