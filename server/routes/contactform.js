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
