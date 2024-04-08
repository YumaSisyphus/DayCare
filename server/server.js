const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const loginRoutes = require("./routes/login");
const childrenRoutes = require("./routes/children");
const parentsRoutes = require("./routes/parents");
const activityRoutes = require("./routes/activity");
const foodRoutes = require("./routes/food");
const classRoutes = require("./routes/class");
const ageGroupRoutes = require("./routes/agegroup");
const mealRoutes = require("./routes/meal");
const staffRoutes = require("./routes/staff");

app.use("/login", loginRoutes);
app.use("/children", childrenRoutes);
app.use("/parents", parentsRoutes);
app.use("/activity", activityRoutes);
app.use("/food", foodRoutes);
app.use("/class", classRoutes);
app.use("/agegroup", ageGroupRoutes);
app.use("/meal", mealRoutes);
app.use("/staff", staffRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
