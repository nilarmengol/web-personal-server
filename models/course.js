const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  title: {
    type: String,
    unique: true
  },
  link: String,
  image: String,
  description: String,
  order: Number
});

module.exports = mongoose.model("Course", CourseSchema);
