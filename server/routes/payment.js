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
// Payment route
router.post("/", async (req, res) => {
  const { ChildId ,Name, Surname, PhoneNumber, Amount, PaymentMethodId } = req.body;

  try {
    // Create a payment intent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Amount * 100, // Stripe requires amount in cents
      currency: "usd",
      payment_method: PaymentMethodId, // Attach payment method to the payment intent
      confirm: true, // Confirm the payment intent immediately
      description: `Payment for ${Name} ${Surname}`,
      metadata: {
        childId: ChildId,
        name: Name,
        surname: Surname,
        phoneNumber: PhoneNumber,
      },
      return_url: "https://localhost:3000/Parents/SuccessPage.js" // Specify your return URL here
    });

    // Save payment details to database using raw SQL query
    const sql = "INSERT INTO payment (ChildId, Date, Name, Surname, PhoneNumber, Amount) VALUES (?, NOW(), ?, ?, ?, ?)";
    const values = [ChildId,Name, Surname, PhoneNumber, Amount];
    
    db.query(sql, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const paymentId = results.insertId;
        res.status(200).json({ 
          client_secret: paymentIntent.client_secret,
          paymentId: paymentId
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;