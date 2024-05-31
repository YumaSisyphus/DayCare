// const express = require("express");
// const router = express.Router();
// const mysql = require("mysql2");

// router.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "daycare",
// });

// router.get("/getContactForm", (req, res) => {
//   const sql = "SELECT * FROM contactform";
//   db.query(sql, [], (err, data) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.json({ success: false, message: "Fetch contact data failed" });
//     } else {
//       return res.json({
//         success: true,
//         message: "Fetch contact data succesful",
//         data,
//       });
//     }
//   });
// });

// router.get("/getContactFormId", (req, res) => {
//   const sql = "SELECT * FROM contactform WHERE ContactFormId=?";
//   const values = [req.body.id];
//   db.query(sql, [values], (err, data) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.json({ success: false, message: "Fetch contact data failed" });
//     } else {
//       return res.json({
//         success: true,
//         message: "Fetch contact data succesful",
//         data,
//       });
//     }
//   });
// });

// router.put("/updateContactForm/:id", (req, res) => {
//   const { id } = req.params;
//   const { Email, Message, DateCreated, Subject } = req.body;

//   const query =
//     "UPDATE contactform SET Email = ?, Message = ?, DateCreated = ?, Subject = ? WHERE ContactFormId = ?";

//   db.query(query, [Email, Message, DateCreated, Subject, id], (err, result) => {
//     if (err) {
//       console.error("Error updating contact form:", err);
//       return res
//         .status(500)
//         .json({ message: "Error updating contact form", error: err });
//     }

//     if (result.affectedRows > 0) {
//       return res.status(200).json({
//         message: "Contact form updated successfully",
//         affectedRows: result.affectedRows,
//       });
//     } else {
//       return res.status(404).json({ message: "Contact form not found" });
//     }
//   });
// });

// router.post("/createContactForm", (req, res) => {
//   const sql =
//     "INSERT INTO contactform (Email, Message, DateCreated, Subject) VALUES (?)";
//   const values = [
//     req.body.email,
//     req.body.message,
//     req.body.dateCreated,
//     req.body.subject,
//   ];
//   db.query(sql, [values], (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.json({
//         success: false,
//         message: "Create contact form failed",
//       });
//     } else {
//       const insertedForm = {
//         id: result.insertId,
//         email: req.body.email,
//         message: req.body.message,
//         dateCreated: req.body.dateCreated,
//         subject: req.body.subject,
//       };
//       return res.json({
//         success: true,
//         message: "Create contact form successful",
//         data: insertedForm,
//       });
//     }
//   });
// });

// router.delete("/deleteContactForm/:ContactFormId", (req, res) => {
//   const deleteContactFormSql = "DELETE FROM contactform WHERE ContactFormId=?";

//   const values = [req.params.ContactFormId];

//   db.query(deleteContactFormSql, values, (err, data) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res
//         .status(500)
//         .json({ success: false, message: "Delete contact failed" });
//     } else {
//       return res
//         .status(200)
//         .json({ success: true, message: "Delete contact successful" });
//     }
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());

const contactFormSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactForm = mongoose.model("ContactForm", contactFormSchema);

router.get("/getContactForm", async (req, res) => {
  try {
    const contactForms = await ContactForm.find();
    return res.json({
      success: true,
      message: "Fetch contact data successful",
      data: contactForms,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Fetch contact data failed" });
  }
});

router.get("/getContactFormId/:id", async (req, res) => {
  try {
    const contactForm = await ContactForm.findById(req.params.id);
    if (!contactForm) {
      return res
        .status(404)
        .json({ success: false, message: "Contact form not found" });
    }
    return res.json({
      success: true,
      message: "Fetch contact data successful",
      data: contactForm,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Fetch contact data failed" });
  }
});

router.put("/updateContactForm/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContactForm = await ContactForm.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedContactForm) {
      return res
        .status(404)
        .json({ success: false, message: "Contact form not found" });
    }
    return res.json({
      success: true,
      message: "Contact form updated successfully",
      data: updatedContactForm,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating contact form" });
  }
});

router.post("/createContactForm", async (req, res) => {
  try {
    const newContactForm = new ContactForm(req.body);
    await newContactForm.save();
    return res.json({
      success: true,
      message: "Create contact form successful",
      data: newContactForm,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Create contact form failed" });
  }
});

router.delete("/deleteContactForm/:id", async (req, res) => {
  try {
    const deletedContactForm = await ContactForm.findByIdAndDelete(
      req.params.id
    );
    if (!deletedContactForm) {
      return res
        .status(404)
        .json({ success: false, message: "Contact form not found" });
    }
    return res.json({
      success: true,
      message: "Contact form deleted successfully",
      data: deletedContactForm,
    });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Delete contact form failed" });
  }
});

module.exports = router;
