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

  db.query(query, [], (err, result) => {
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
        const staffClassQuery =
          "INSERT INTO staff_class (StaffId, ClassId) VALUES (?, ?)";
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
  const { Name, AgeGroupId, StaffId } = req.body;

  const updateClassQuery =
    "UPDATE class SET Name = ?, AgeGroupId = ? WHERE ClassId = ?";
  const updateStaffClassQuery =
    "UPDATE staff_class SET StaffId = ? WHERE ClassId = ?";

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error beginning transaction:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    db.query(updateClassQuery, [Name, AgeGroupId, id], (err, result) => {
      if (err) {
        db.rollback(() => {
          console.error("Error updating class:", err);
          res.status(500).json({ message: "Internal Server Error" });
        });
      } else {
        db.query(updateStaffClassQuery, [StaffId, id], (err) => {
          if (err) {
            db.rollback(() => {
              console.error("Error updating staff_class:", err);
              res.status(500).json({ message: "Internal Server Error" });
            });
          } else {
            db.commit((err) => {
              if (err) {
                db.rollback(() => {
                  console.error("Error committing transaction:", err);
                  res.status(500).json({ message: "Internal Server Error" });
                });
              } else {
                const getClassQuery = `
                  SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, c.AgeGroupId
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
          }
        });
      }
    });
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

router.get("/assignedClasses", (req, res) => {
  const { StaffId } = req.query;

  const query = `
    SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName
    FROM class c
    JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
    JOIN staff_class sc ON c.ClassId = sc.ClassId
    WHERE sc.StaffId = ?
  `;

  db.query(query, [StaffId], (err, result) => {
    if (err) {
      console.error("Error fetching assigned classes:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT c.ClassId, c.Name, a.RangeG as AgeGroupName, s.Name as StaffName,
      JSON_ARRAYAGG(JSON_OBJECT('ChildId', ch.ChildId, 'ChildName', ch.Name, 'Active', ch.Active, 'Gender', ch.Gender)) as Children
    FROM class c
    JOIN agegroup a ON c.AgeGroupId = a.AgeGroupId
    LEFT JOIN staff_class sc ON c.ClassId = sc.ClassId
    LEFT JOIN staff s ON sc.StaffId = s.StaffId
    LEFT JOIN class_child cc ON c.ClassId = cc.ClassId
    LEFT JOIN child ch ON cc.ChildId = ch.ChildId
    WHERE c.ClassId = ?
    GROUP BY c.ClassId, c.Name, a.RangeG, s.Name
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching class details:", err);
      return res.status(500).json({ message: "Internal Server Error", err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(result[0]);
  });
});

router.post("/assignChild", (req, res) => {
  const { ClassId, ChildId } = req.body;

  const query = "INSERT INTO class_child (ClassId, ChildId) VALUES (?, ?)";

  db.query(query, [ClassId, ChildId], (err, result) => {
    if (err) {
      console.error("Error assigning child to class:", err);
      return res.status(500).json({ message: "Internal Server Error", err });
    }

    res.json({
      message: "Child assigned to class successfully",
      affectedRows: result.affectedRows,
    });
  });
});

router.delete("/removeChildFromClass", (req, res) => {
  const { childId, classId } = req.body;

  console.log("Received payload:", req.body);

  const sql = `
    DELETE FROM class_child 
    WHERE ChildId = ? AND ClassId = ?
  `;

  console.log("SQL Query:", sql);
  console.log("Values passed to SQL Query:", [childId, classId]);

  db.query(sql, [childId, classId], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Remove child from class failed",
      });
    } else {
      return res.json({
        success: true,
        message: "Child removed from class successfully",
      });
    }
  });
});

module.exports = router;
