const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/courses/preview", function (req, res) {});

courseRouter.post("/courses/purchase", function (req, res) {});

module.export = {
  courseRouter: courseRouter,
};
