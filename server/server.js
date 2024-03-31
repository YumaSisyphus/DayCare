const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())

const loginRoutes = require("./routes/login");
const childrenRoutes = require("./routes/children");

app.use("/login", loginRoutes);
app.use("/children", childrenRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});