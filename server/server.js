const express = require("express");
const app = express();
const mysql = require("mysql2");

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare_schema",
});