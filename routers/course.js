const express = require("express");
const CourseController = require("../controllers/course");
const multipart = require("connect-multiparty");

const md_auth = require("../middlewares/authenticated");
const md_upload_image = multipart({ uploadDir: "./uploads/image" });

const api = express.Router();

api.post("/add-course", [md_auth.ensureAuth], CourseController.addCourse);
api.get("/get-courses", CourseController.getCourses);
api.delete(
  "/delete-course/:id",
  [md_auth.ensureAuth],
  CourseController.deleteCourse
);
api.put(
  "/update-course/:id",
  [md_auth.ensureAuth],
  CourseController.updateCourse
);
api.put(
  "/upload-image-course/:id",
  [md_auth.ensureAuth, md_upload_image],
  CourseController.uploadImage
);

api.get("/get-image/:imageName", CourseController.getImage);

module.exports = api;
