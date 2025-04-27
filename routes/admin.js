const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {});

adminRouter.post("/signin", function (req, res) {});

adminRouter.post("courses", function (req, res) {});

adminRouter.delete("courses", function (req, res) {});

adminRouter.put("courses", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
