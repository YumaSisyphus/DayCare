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

router.get("", (req, res) => {
  const query = "SELECT * FROM activity";

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  const activityId = req.params.id;

  // Delete related records from activity_calendar table
  const deleteCalendarQuery =
    "DELETE FROM activity_calendar WHERE ActivityId = ?";

  db.query(deleteCalendarQuery, [activityId], (err) => {
    if (err) {
      res.status(500).json({
        message: "Error deleting related calendar records",
        error: err,
      });
      return;
    }

    // Delete activity from activity table
    const deleteActivityQuery = "DELETE FROM activity WHERE ActivityId = ?";

    db.query(deleteActivityQuery, [activityId], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error deleting activity", error: err });
      } else {
        res.json({
          message: "Activity deleted successfully",
          affectedRows: result.affectedRows,
        });
      }
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Description } = req.body;

  const query =
    "UPDATE activity SET Name = ?, Description = ? WHERE ActivityId = ?";

  db.query(query, [Name, Description, id], (err, result) => {
    if (err) {
      console.error("Error updating activity:", err);
      return res
        .status(500)
        .json({ message: "Error updating activity", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Activity updated successfully",
        affectedRows: result.affectedRows,
      });
    } else {
      return res.status(404).json({ message: "Activity not found" });
    }
  });
});

router.post("", (req, res) => {
  const { Name, Description } = req.body;

  const query = "INSERT INTO activity (Name, Description) VALUES (?, ?)";

  db.query(query, [Name, Description], (err, result) => {
    if (err) {
      console.error("Error adding new activity:", err);
      return res
        .status(500)
        .json({ message: "Error adding new activity", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Activity added successfully",
        newActivity: {
          ActivityId: result.insertId,
          Name: Name,
          Description: Description,
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to add new activity" });
    }
  });
});

module.exports = router;
