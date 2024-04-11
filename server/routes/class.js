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
      SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName
      FROM class c
      JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
    `;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { Name, AgeGroupId } = req.body;
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
  const { Name, AgeGroupId } = req.body;
  const query = "UPDATE class SET Name = ?, AgeGroupId = ? WHERE ClassId = ?";

  db.query(query, [Name, AgeGroupId, id], (err, result) => {
    if (err) throw err;

    const getClassQuery = `
        SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, c.AgeGroupId
        FROM class c
        JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
        WHERE c.ClassId = ?
      `;

    db.query(getClassQuery, [id], (err, classResult) => {
      if (err) throw err;
      res.json({
        message: "Class updated successfully",
        updatedClass: classResult[0],
        affectedRows: result.affectedRows,
      });
    });
  });
});

router.get("/staffByClass", (req, res) => {
  const query = `
    SELECT s.StaffId, s.Name as StaffName, c.ClassId, c.Name as ClassName
    FROM staff_class sc
    JOIN staff s ON sc.StaffId = s.StaffId
    JOIN class c ON sc.ClassId = c.ClassId
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
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
