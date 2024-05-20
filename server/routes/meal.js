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

router.get("/getMeal", (req, res) => {
  const sql = "SELECT * FROM meal";
  db.query(sql, [], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch meal data failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch meal data succesful",
        data,
      });
    }
  });
});

router.get("/getMealId", (req, res) => {
  const sql = "SELECT * FROM meal WHERE MealId=?";
  const values = [req.body.id];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch meal data failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch meal data succesful",
        data,
      });
    }
  });
});

router.put("/updateMeal/:id", (req, res) => {
  const { id } = req.params;
  const { Name} = req.body;

  const query =
    "UPDATE meal SET Name = ?";

  db.query(query, [Name, id], (err, result) => {
    if (err) {
      console.error("Error updating meal:", err);
      return res
        .status(500)
        .json({ message: "Error updating meal", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Meal updated successfully",
        affectedRows: result.affectedRows,
      });
    } else {
      return res.status(404).json({ message: "Meal not found" });
    }
  });
});

router.post("/createMeal", (req, res) => {
  const sql =
    "INSERT INTO meal (Name) VALUES (?)";
  const values = [
    req.body.name,
 
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Create meal  failed",
      });
    } else {
      const insertedMeal = {
        id: result.insertId,
        name: req.body.name,
     
      };
      return res.json({
        success: true,
        message: "Create meal successful",
        data: insertedMeal,
      });
    }
  });
});

router.delete("/deleteMeal/:MealId", (req, res) => {
  const deleteMealsSql = "DELETE FROM food_calendar_meal WHERE MealId=?";
  const deleteMealSql = "DELETE FROM meal WHERE MealId=?";

  const values = [req.params.MealId];

  db.query(deleteMealSql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Delete meal failed" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Delete meal successful" });
    }
  });
});

module.exports = router;
