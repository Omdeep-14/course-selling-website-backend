const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const user = new schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const admin = new schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const courses = new schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId,
});

const purchases = new schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", user);
const adminModel = mongoose.model("admin", admin);
const coursesModel = mongoose.model("courses", courses);
const purchasesModel = mongoose.model("purchases", purchases);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  coursesModel: coursesModel,
  purchasesModel: purchasesModel,
};
