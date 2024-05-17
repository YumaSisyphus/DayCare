const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const multer = require("multer");
const upload = multer({ dest: "upload/" });

router.use(express.json());
router.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.get("/getChildren", (req, res) => {
  const sql = `
  SELECT * FROM child
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch children failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch children succesful",
        children: data,
      });
    }
  });
});

router.get("/getChild/:id", (req, res) => {
  const sql = `
  SELECT * FROM child
  WHERE ChildId=?
  `;
  const values = [req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch child failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch child succesful",
        child: data,
      });
    }
  });
});

router.delete("/deleteChildren", (req, res) => {
  const childIds = req.body.childIds;
  const sql = `
  DELETE FROM child 
  WHERE ChildId IN (?)
  `;
  db.query(sql, [childIds], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Delete children failed" });
    } else {
      return res.json({
        success: true,
        message: "Delete children successful",
      });
    }
  });
});

router.post("/createChildren", upload.array("photo"), (req, res) => {
  console.log(req.files);
  const childrenData = req.body.map((child) => [
    child.birthday,
    child.gender,
    child.photoName,
    child.allergies,
    child.vaccines,
    child.name,
    child.surname,
    child.payments,
    child.active,
  ]);

  const sql = `
    INSERT INTO child 
    (Birthday, Gender, Photo, Allergies, Vaccines, Name, Surname, Payments, Active) 
    VALUES ?
    `;
  db.query(sql, [childrenData], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Create children failed" });
    } else {
      const childIds = Array.from(
        { length: req.body.length },
        (_, index) => data.insertId + index
      );
      return res.json({
        success: true,
        message: "Create children successful",
        childIds: childIds,
      });
    }
  });
});

router.put("/updateChild", (req, res) => {
  const sql = `
    UPDATE child 
    SET Birthday=?, Gender=?, Photo=?, 
    Allergies=?, Vaccines=?, Name=?, 
    Surname=?, Payments=?, Active=? 
    WHERE ChildId=?
    `;
  const values = [
    req.body.birthday,
    req.body.gender,
    req.body.photo,
    req.body.allergies,
    req.body.vaccines,
    req.body.name,
    req.body.surname,
    req.body.payments,
    req.body.active,
    req.body.childId,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Update child failed" });
    } else {
      return res.json({
        success: true,
        message: "Update child successful",
        child: data,
      });
    }
  });
});

router.get("/getClasses", (req, res) => {
  const sql = `
    SELECT ClassId, Name
    FROM class
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Error fetching classes",
      });
    } else {
      return res.json({
        success: true,
        message: "Fetch classes successful",
        class: data,
      });
    }
  });
});

router.get("/getChildClass/:id", (req, res) => {
  const values = [req.params.id];
  const sql = `
    SELECT cc.ChildId, cc.ClassId, cl.Name AS ClassName
    FROM class_child cc
    JOIN child ch ON cc.ChildId = ch.ChildId
    JOIN class cl ON cc.ClassId = cl.ClassId
    WHERE ch.ChildId=?
  `;
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Error fetching class-child relationships",
      });
    } else {
      return res.json({
        success: true,
        message: "Update child successful",
        class: data,
      });
    }
  });
});

router.post("/assignChildToClass", (req, res) => {
  const values = req.body.childIdsWithClassIds.map((child) => [
    child.childId,
    child.classId,
  ]);
  const sql = `
  INSERT INTO class_child 
  (ChildId, ClassId) 
  VALUES ?
  `;
  db.query(sql, [values], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Assigning children to class failed",
      });
    } else {
      return res.json({
        success: true,
        message: "Children assigned to class successfully",
      });
    }
  });
});

router.put("/updateChildToClass", (req, res) => {
  const values = [
    req.body.childIdsWithClassIds.childId,
    req.body.childIdsWithClassIds.classId,
    req.body.childIdsWithClassIds.childId,
  ];
  const sql = `
    UPDATE class_child 
    SET ChildId=?, ClassId=?
    WHERE ChildId=?
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
