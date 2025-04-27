const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();
main();

app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { userModel } = require("./db");
const { adminModel } = require("./db");
const { coursesModel } = require("./db");
const { purchasesModel } = require("./db");

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  await mongoose.connect(process.env.CONNECT);
  app.listen(3000);
}
