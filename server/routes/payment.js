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

module.exports = router;
