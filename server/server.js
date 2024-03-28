const express = require("express");
const app = express();

const loginRoutes = require("./routes/login");

app.use("/login", loginRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
