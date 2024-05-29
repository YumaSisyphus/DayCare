const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "daycare",
});

router.post("/", async (req, res) => {
  const { ChildId, Name, Surname, PhoneNumber, Amount, PaymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Amount * 100, 
      currency: "usd",
      payment_method: PaymentMethodId,
      confirm: true, 
      description: `Payment for ${Name} ${Surname}`,
      metadata: {
        childId: ChildId,
        name: Name,
        surname: Surname,
        phoneNumber: PhoneNumber,
      },
      return_url: "https://localhost:3000/Parents/SuccessPage.js" 
    });

    // Update child's payment amount in the database
    const updateSql = "UPDATE child SET Payments = Payments - ? WHERE ChildId = ?";
    const updateValues = [Amount, ChildId];

    db.query(updateSql, updateValues, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Save payment details to database using raw SQL query
        const insertSql = "INSERT INTO payment (ChildId, Date, Name, Surname, PhoneNumber, Amount) VALUES (?, NOW(), ?, ?, ?, ?)";
        const insertValues = [ChildId, Name, Surname, PhoneNumber, Amount];

        db.query(insertSql, insertValues, (insertError, insertResults) => {
          if (insertError) {
            console.error(insertError);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const paymentId = insertResults.insertId;
            res.status(200).json({
              client_secret: paymentIntent.client_secret,
              paymentId: paymentId
            });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getPaymentsWithChild", (req, res) => {
  const paymentsWithChildQuery = `
    SELECT 
      p.PaymentId,
      p.ChildId,
      p.Name,
      p.Surname,
      p.Date,
      p.PhoneNumber,
      p.Amount,
      c.Name AS ChildName,
      c.Surname AS ChildSurname
    FROM 
      payment p
    LEFT JOIN 
      child c ON p.ChildId = c.ChildId`;

  db.query(paymentsWithChildQuery, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Fetch payments with child failed" });
    } else {
      return res.json({
        success: true,
        message: "Fetch payments with child successful",
        data: data,
      });
    }
  });
});

//cash payments


router.post("/createPayment", (req, res) => {
  const { name, surname, date, phonenumber, amount, childId } = req.body;

  // First, check if the child exists and is associated with the parent
  const checkChildQuery = "SELECT * FROM child WHERE ChildId = ?";
  db.query(checkChildQuery, [childId], (childErr, childResult) => {
    if (childErr) {
      console.error("Database error:", childErr);
      return res.json({ success: false, message: "Error checking child" });
    }

    if (childResult.length === 0) {
      // Child does not exist or is not associated with the parent
      return res.json({ success: false, message: "Child not found or not associated with the parent" });
    }

    // Child exists and is associated with the parent, proceed with payment insertion
    const paymentInsertQuery =
      "INSERT INTO payment (Name, Surname, Date, PhoneNumber, Amount, ChildId) VALUES (?, ?, ?, ?, ?, ?)";
    const paymentValues = [name, surname, date, phonenumber, amount, childId];

    db.query(paymentInsertQuery, paymentValues, (paymentErr, result) => {
      if (paymentErr) {
        console.error("Database error:", paymentErr);
        return res.json({ success: false, message: "Create payment failed" });
      } else {
        const insertedPayment = {
          id: result.insertId,
          name,
          surname,
          date,
          phonenumber,
          amount,
          childId,
        };

        // Update child's payment amount in the database
        const updateSql = "UPDATE child SET Payments = Payments - ? WHERE ChildId = ?";
        const updateValues = [amount, childId];

        db.query(updateSql, updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.error("Database error:", updateError);
            return res.json({ success: false, message: "Update child's payment amount failed" });
          } else {
            return res.json({
              success: true,
              message: "Create payment successful",
              data: insertedPayment,
            });
          }
        });
      }
    });
  });
});


router.delete("/deletePayment/:paymentId", (req, res) => {
  const sql = "DELETE FROM payment WHERE PaymentId=?";
  const values = [req.params.paymentId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Delete payment failed" });
    } else {
      return res.json({
        success: true,
        message: "Delete payment succesful",
      });
    }
  });
});

router.put("/updatePayment", (req, res) => {
  const sql =
    "UPDATE payment SET  Name=?, Surname=?, Date=?, PhoneNumber=?, Amount=? WHERE PaymentId=?";
  const values = [
    req.body.name,
    req.body.surname,
    req.body.date,
    req.body.phonenumber,
    req.body.amount,
    req.body.paymentId,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ success: false, message: "Update payment failed" });
    } else {
      return res.json({
        success: true,
        message: "Update payment successful",
        data:data,
      });
    }
  });
});



  // Insert the parent-child relationships into the child_parent table
 

router.get("/getChildren", (req, res) => {
  const sql = `
    SELECT ChildId, Name
    FROM child
  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({
        success: false,
        message: "Error fetching children",
      });
    } else {
      return res.json({
        success: true,
        message: "Fetch children successful",
        child: data,
      });
    }
  });
});
module.exports = router;
