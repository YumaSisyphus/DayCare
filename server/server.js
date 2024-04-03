const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const loginRoutes = require("./routes/login");
const childrenRoutes = require("./routes/children");
const parentsRoutes = require("./routes/parents");
const activityRoutes = require("./routes/activity");
const foodRoutes = require("./routes/food");

app.use("/login", loginRoutes);
app.use("/children", childrenRoutes);
app.use("/parents", parentsRoutes);
app.use("/activity", activityRoutes);
app.use("/food", foodRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
