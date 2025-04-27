const { Router } = require("express");
const bcrypt = require("bcrypt");

const userRouter = Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPass = await bcrypt.hash(password, 5);

    await userModel.create({
      email: email,
      password: hashedPass,
      name: name,
    });

    res.json({
      message: "u are signed up",
    });
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email,
    });

    const checkpass = bcrypt.compare(password, user.password);

    if (user && checkpass) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        message: "you are logged in",
      });
    } else {
      res.status.json({
        message: "incorrect credentials",
      });
    }
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "ok",
  });
});

module.exports = {
  userRouter: userRouter,
};
