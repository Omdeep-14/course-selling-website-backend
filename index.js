const express = require("express");
const app = express();
app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter);
app.use("/course", courseRouter);
