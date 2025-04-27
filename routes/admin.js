const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { adminModel, coursesModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET1;
const { adminMiddleware } = require("./middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPass = await bcrypt.hash(password, 5);

    await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
      email: email,
    });

    const checkpass = await bcrypt.compare(password, admin.password);

    if (admin && checkpass) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET1);
      res.json({
        message: "you are logged in",
      });
    } else {
      res.status(403).json({
        message: "incorrect credentials",
      });
    }
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

adminRouter.post("/courses", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageURL, price } = req.body;

  const course = await coursesModel.create({
    title: title,
    description: description,
    imageURL: imageURL,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "course created",
  });
});

adminRouter.delete("/courses", function (req, res) {});

adminRouter.put("/courses", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
