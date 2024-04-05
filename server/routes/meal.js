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
      return res.json({ success: false, message: "Fetch meal failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch meal succesful",
        data,
      });
    }
  });
});

router.get("/getMealId", (req, res) => {
  const sql = "SELECT * FROM meal WHERE MealId=?";
  const values = [req.body.parentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch parent succesful",
        data,
      });
    }
  });
});

router.put("/updateMeal/:id", (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  const query =
    "UPDATE meal SET Name = ? WHERE MealId = ?";

  db.query(query, [Name,  id], (err, result) => {
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
  const { Name} = req.body;

  const query =
    "INSERT INTO meal (Name) VALUES (?)";

  db.query(query, [Name], (err, result) => {
    if (err) {
      console.error("Error adding new meal:", err);
      return res
        .status(500)
        .json({ message: "Error adding new meal", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Meal added successfully",
        newMeal: {
          MealId: result.insertId,
          Name: Name,
     
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to add new meal" });
    }
  });
});

router.delete("/deleteFood/:mealId", (req, res) => {
  const deleteMealsSql = "DELETE FROM food_calendar_meal WHERE MealId=?";
  const deleteMealSql = "DELETE FROM meal WHERE MealId=?";

  const values = [req.params.foodId];

  db.query(deleteMealsSql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Delete meals failed" });
    }

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
});

module.exports = router;
