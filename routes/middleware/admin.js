const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  const token = req.header.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
