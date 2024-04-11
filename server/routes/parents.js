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

const formatDate = (date) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};

router.get("/getParents", (req, res) => {
  const parentChildQuery = "SELECT p.*, c.Name AS ChildName, c.Surname AS ChildSurname FROM parent p LEFT JOIN child_parent cp ON p.ParentId = cp.ParentId LEFT JOIN child c ON cp.ChildId = c.ChildId";
  db.query(parentChildQuery, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch parents with child failed" });
    } else {
      // Convert dates in the 'data' array to the required format
      const formattedData = data.map((item) => ({
        ...item,
        Birthday: formatDate(item.Birthday),
        // Add more date fields as needed
      }));
      return res.json({
        success: true,
        message: "Fetch parents with child successful",
        data: formattedData,
      });
    }
  });
});



router.get("/getParent/:parentId", (req, res) => {
  const sql = "SELECT * FROM parent WHERE ParentId=?";
  const values = [req.params.parentId];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch parent failed" });
    } else {
      // Convert dates in the 'data' array to the required format
      const formattedData = data.map((item) => ({
        ...item,
        Birthday: formatDate(item.Birthday),
        // Add more date fields as needed
      }));
      return res.json({
        success: true,
        message: "Fetch parent successful",
        data: formattedData,
      });
    }
  });
});

router.delete("/deleteParent/:parentId", (req, res) => {
  const sql = "DELETE FROM parent WHERE ParentId=?";
  const values = [req.params.parentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Delete parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Delete parent succesful",
      });
    }
  });
});

router.post("/createParent", (req, res) => {
  const sql =
    "INSERT INTO parent (Name, Surname, Birthday, Gender, Email, Address, PhoneNumber, Username, Password, Active) VALUES (?)";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.birthday,
    req.body.gender,
    req.body.email,
    req.body.address,
    req.body.phonenumber,
    req.body.username,
    req.body.password,
    req.body.active,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Create parent failed" });
    } else {
      const insertedParent = {
        id: result.insertId,
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phonenumber,
        username: req.body.username,
        password: req.body.password,
        active: req.body.active,
      };
      return res.json({
        success: true,
        message: "Create parent successful",
        data: insertedParent,
      });
    }
  });
});

router.put("/updateParent", (req, res) => {
  const sql =
    "UPDATE parent SET  Name=?, Surname=?, Birthday=?, Gender=?, Email=?, Address=?, PhoneNumber=?, Username=?, Password=?, Active=? WHERE ParentId=?";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.birthday,
    req.body.gender,
    req.body.email,
    req.body.address,
    req.body.phonenumber,
    req.body.username,
    req.body.password,
    req.body.active,
    req.body.parentId,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Update parent failed" });
    } else {
      return res.json({
        success: true,
        message: "Update parent successful",
      });
    }
  });
});

router.post("/assignChildToParent", (req, res) => {
  const { parentId, childIds } = req.body;
  console.log(childIds);

  // Insert the parent-child relationships into the child_parent table
  const insertRelationshipSql =
    "INSERT INTO child_parent (ChildId, ParentId) VALUES ?";
  const insertRelationshipValues = childIds.map((childId) => [
    childId,
    parentId,
  ]);

  db.query(insertRelationshipSql, [insertRelationshipValues], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({
          success: false,
          message: "Assigning children to parent failed",
        });
    } else {
      return res
        .status(200)
        .json({
          success: true,
          message: "Children assigned to parent successfully",
        });
    }
  });
});
     
router.get("/getchildparent/:id", (req, res) => {
  const values = [req.params.id];
  const sql = `
    SELECT cp.ChildId, cp.ParentId, c.Name AS ChildName, c.Surname AS Surname, p.Name AS Name, p.Surname AS Surname
    FROM child_parent cp
    JOIN child c ON cp.ChildId = c.ChildId
    JOIN parent p ON cp.ParentId = p.ParentId
  `;
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Error fetching parent-child relationships",
      });
    } else {
      return res.json({
        success: true,
        message: "Update parent successful",
        class: data,
      });
    }
  });
});

router.put("/updateChildToParent", (req, res) => {
  const values = [
    req.body.parentIdsWithChildIds.parentId,
    req.body.parentIdsWithChildIds.childId,
    req.body.parentIdsWithChildIds.parentId,
  ];
  const sql = `
    UPDATE child_parent 
    SET ParentId=?, ChildId=?
    WHERE ParentId=?
    `;
  db.query(sql, values, (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Editing children to class failed",
      });
    } else {
      return res.json({
        success: true,
        message: "Children edited to class successfully",
      });
    }
  });
});


module.exports = router;
