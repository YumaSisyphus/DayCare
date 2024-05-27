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
  const query = `
      SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, s.Name as StaffName
      FROM class c
      JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
      LEFT JOIN staff_class sc ON c.ClassId = sc.ClassId
      LEFT JOIN staff s ON sc.StaffId = s.StaffId
    `;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


router.post("/", (req, res) => {
  const { Name, AgeGroupId, StaffId } = req.body;
  const query = "INSERT INTO class (Name, AgeGroupId) VALUES (?, ?)";

  db.query(query, [Name, AgeGroupId], (err, result) => {
    if (err) throw err;

    const newClassId = result.insertId;
    const getClassQuery = `
        SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, c.AgeGroupId
        FROM class c
        JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
        WHERE c.ClassId = ?
      `;

    db.query(getClassQuery, [newClassId], (err, classResult) => {
      if (err) throw err;
      
      if (StaffId) {
        const staffClassQuery = "INSERT INTO staff_class (StaffId, ClassId) VALUES (?, ?)";
        db.query(staffClassQuery, [StaffId, newClassId], (err) => {
          if (err) throw err;
        });
      }

      res.json({
        message: "Class added successfully",
        newClass: classResult[0],
        affectedRows: result.affectedRows,
      });
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Name, AgeGroupId, StaffId } = req.body; // Extract StaffId from request body
  const query = "UPDATE class SET Name = ?, AgeGroupId = ?, StaffId = ? WHERE ClassId = ?";

  db.query(query, [Name, AgeGroupId, StaffId, id], (err, result) => {
    if (err) {
      console.error("Error updating class:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      const getClassQuery = `
        SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, c.AgeGroupId, c.StaffId
        FROM class c
        JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
        WHERE c.ClassId = ?
      `;
      
      db.query(getClassQuery, [id], (err, classResult) => {
        if (err) {
          console.error("Error fetching updated class:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.json({
            message: "Class updated successfully",
            updatedClass: classResult[0],
            affectedRows: result.affectedRows,
          });
        }
      });
    }
  });
});




router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM class WHERE ClassId = ?";

  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({
      message: "Class deleted successfully",
      affectedRows: result.affectedRows,
    });
  });
});

module.exports = router;
