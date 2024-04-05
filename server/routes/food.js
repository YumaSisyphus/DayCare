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

router.get("/getFood", (req, res) => {
  const sql = "SELECT * FROM food";
  db.query(sql, [], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch food failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch food succesful",
        data,
      });
    }
  });
});

router.get("/getFoodId", (req, res) => {
  const sql = "SELECT * FROM food WHERE FoodId=?";
  const values = [req.body.parentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch food failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch food succesful",
        data,
      });
    }
  });
});

router.put("/updateFood/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Description, Allergens } = req.body;

  const query =
    "UPDATE food SET Name = ?, Description = ?, Allergens = ? WHERE FoodId = ?";

  db.query(query, [Name, Description, Allergens, id], (err, result) => {
    if (err) {
      console.error("Error updating food:", err);
      return res
        .status(500)
        .json({ message: "Error updating food", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Food updated successfully",
        affectedRows: result.affectedRows,
      });
    } else {
      return res.status(404).json({ message: "Food not found" });
    }
  });
});

router.post("/createFood", (req, res) => {
  const { Name, Description, Allergens } = req.body;

  const query =
    "INSERT INTO food (Name, Description, Allergens) VALUES (?, ?, ?)";

  db.query(query, [Name, Description, Allergens], (err, result) => {
    if (err) {
      console.error("Error adding new food:", err);
      return res
        .status(500)
        .json({ message: "Error adding new food", error: err });
    }

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Food added successfully",
        newFood: {
          FoodId: result.insertId,
          Name: Name,
          Description: Description,
          Allergens: Allergens,
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to add new food" });
    }
  });
});

router.delete("/deleteFood/:foodId", (req, res) => {
  const deleteMealsSql = "DELETE FROM food_calendar_meal WHERE FoodId=?";
  const deleteFoodSql = "DELETE FROM food WHERE FoodId=?";

  const values = [req.params.foodId];

  db.query(deleteMealsSql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Delete meals failed" });
    }

    db.query(deleteFoodSql, values, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Delete food failed" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Delete food successful" });
      }
    });
  });
});

module.exports = router;
