const Course = require("../models/course");

function addCourse(req, res) {
  const body = req.body;
  const course = new Course(body);
  course.order = 1000;

  course.save((err, courseStore) => {
    if (err) {
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
        res.status(200).send({ code: 200, message: courseStored });
      }
    });
}

function deleteCourse(req, res) {
  const { id } = req.params;

  Course.findByIdAndRemove(id, (err, courseDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!courseDeleted) {
      res.status(404).send({ message: "Curso no encontrado" });
    } else {
      res.status(200).send({ message: "Curso eliminado correctamente" });
    }
  });
}

function updateCourse(req, res) {
  const id = req.params.id;
  const courseData = req.body;

  Course.findByIdAndUpdate(id, courseData, (err, courseUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!courseUpdated) {
      res.status(404).send({ message: "Curso no encontrado" });
    } else {
      res.status(200).send({ message: "Curso actualizado correctamente" });
    }
  });
}

module.exports = {
  addCourse,
  getCourses,
  deleteCourse,
  updateCourse
};
