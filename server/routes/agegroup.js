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

router.get("/", (req, res) => {
  const query = "SELECT * FROM agegroup";

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { Range } = req.body;

  const query = "INSERT INTO agegroup (RangeG) VALUES (?)";

  db.query(query, [Range], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error creating age group", error: err });
      return;
    }
    res.json({
      message: "Age group created successfully",
      newAgeGroup: { AgeGroupId: result.insertId, Range },
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Range } = req.body;

  const query = "UPDATE agegroup SET RangeG = ? WHERE AgeGroupId = ?";

  db.query(query, [Range, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating age group", error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Age group not found" });
      return;
    }
    res.json({
      message: "Age group updated successfully",
      affectedRows: result.affectedRows,
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const checkQuery = "SELECT * FROM class WHERE AgeGroupId = ?";
  db.query(checkQuery, [id], (checkErr, checkResult) => {
    if (checkErr) {
      res.status(500).json({
        message: "Error checking age group connections",
        error: checkErr,
      });
      return;
    }

    if (checkResult.length > 0) {
      res.status(400).json({
        message: "Cannot delete age group. It is connected to a class.",
      });
      return;
    }

    const query = "DELETE FROM agegroup WHERE AgeGroupId = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error deleting age group", error: err });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Age group not found" });
        return;
      }
      res.json({
        message: "Age group deleted successfully",
        affectedRows: result.affectedRows,
      });
    });
  });
});

module.exports = router;
