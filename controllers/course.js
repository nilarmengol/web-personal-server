const Course = require("../models/course");
const fs = require("fs");
const path = require("path");

function addCourse(req, res) {
  const body = req.body;
  const course = new Course(body);
  course.order = 1000;

  course.save((err, courseStore) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "El curso que estás creando ya existe" });
    } else if (!courseStore) {
      res.status(404).send({ message: "No se ha podido crear el curso" });
    } else {
      res
        .status(200)
        .send({ code: 200, message: "Curso creado correctamente" });
    }
  });
}

function getCourses(req, res) {
  Course.find()
    .find()
    .sort({ order: "asc" })
    .exec((err, courseStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor" });
      } else if (!courseStored) {
        res
          .status(404)
          .send({ message: "No se han podido encontrar los cursos" });
      } else {
        res.status(200).send({ code: 200, courses: courseStored });
      }
    });
}

function deleteCourse(req, res) {
  const { id } = req.params;

  Course.findByIdAndRemove(id, (err, courseDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!courseDeleted) {
      res.status(404).send({ code: 404, message: "Curso no encontrado" });
    } else {
      res
        .status(200)
        .send({ code: 200, message: "Curso eliminado correctamente" });
    }
  });
}

function updateCourse(req, res) {
  const id = req.params.id;
  const courseData = req.body;

  Course.findByIdAndUpdate(id, courseData, (err, courseUpdated) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!courseUpdated) {
      res.status(404).send({ code: 404, message: "Curso no encontrado" });
    } else {
      res
        .status(200)
        .send({ code: 200, message: "Curso actualizado correctamente" });
    }
  });
}

function uploadImage(req, res) {
  const params = req.params;
  Course.findById({ _id: params.id }, (err, courseData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!courseData) {
      res.status(404).send({ message: "No ha encontrado ningún usuario" });
    } else {
      let course = courseData;
      if (req.files) {
        let filePath = req.files.image.path;
        let fileSplit = filePath.split("\\");
        let fileName = fileSplit[2];
        let extSplit = fileName.split(".");
        fileExt = extSplit[1];

        if (fileExt !== "png" && fileExt !== "jpg") {
          res.status(400).send({
            message:
              "La extensión de la imagen no es válida. (Extensiones permitidas: .png y .jpg)"
          });
        } else {
          course.image = fileName;
          Course.findByIdAndUpdate(
            { _id: params.id },
            course,
            (err, courseResult) => {
              if (err) {
                res.status(500).send({ message: "Error del servidor" });
              } else if (!courseResult) {
                res
                  .status(404)
                  .send({ message: "No se ha encontrado ningún usuario" });
              } else {
                res.status(200).send({ imageName: fileName });
              }
            }
          );
        }

        console.log(extSplit);
      }
    }
  });
}

function getImage(req, res) {
  const imageName = req.params.imageName;
  const filePath = "./uploads/image/" + imageName;

  fs.exists(filePath, exists => {
    if (!exists) {
      res.status(404).send({ message: "La imagen que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

module.exports = {
  addCourse,
  getCourses,
  deleteCourse,
  updateCourse,
  uploadImage,
  getImage
};
