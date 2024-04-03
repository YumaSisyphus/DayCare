const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

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
      return res
        .status(500)
        .json({ success: false, message: "Fetch food failed" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Fetch food successful", data });
    }
  });
});

router.post("/createFood", (req, res) => {
  const sql =
    "INSERT INTO food (Name, Description, Allergens) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.description, req.body.allergens];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Create food failed" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Create food successful",
        test: { ...req.body, FoodId: data.insertId },
      });
    }
  });
});

router.put("/updateFood", (req, res) => {
  const sql =
    "UPDATE food SET Name=?, Description=?, Allergens=? WHERE FoodId=?";
  const values = [
    req.body.name,
    req.body.description,
    req.body.allergens,
    req.body.foodId,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Update food failed" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Update food successful" });
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
