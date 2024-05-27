require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your API key

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

mongoose
  .connect(
    "mongodb+srv://butritnreqica:EwKrYj7B9y586W1G@cluster0.ufzgp4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", //"mongodb://localhost:27017/daycare"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const loginRoutes = require("./routes/login");
const childrenRoutes = require("./routes/children");
const parentsRoutes = require("./routes/parents");
const activityRoutes = require("./routes/activity");
const foodRoutes = require("./routes/food");
const classRoutes = require("./routes/class");
const ageGroupRoutes = require("./routes/agegroup");
const mealRoutes = require("./routes/meal");
const staffRoutes = require("./routes/staff");
const contactformRoutes = require("./routes/contactform");
const paymentRoutes = require("./routes/payment");

app.use("/login", loginRoutes);
app.use("/children", childrenRoutes);
app.use("/parents", parentsRoutes);
app.use("/activity", activityRoutes);
app.use("/food", foodRoutes);
app.use("/class", classRoutes);
app.use("/agegroup", ageGroupRoutes);
app.use("/meal", mealRoutes);
app.use("/staff", staffRoutes);
app.use("/contactform", contactformRoutes);
app.use("/payment", paymentRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
