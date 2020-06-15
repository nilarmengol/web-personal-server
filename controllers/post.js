const Post = require("../models/post");

function addPost(req, res) {
  const body = req.body;
  const post = new Post(body);

  post.save((err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!postStored) {
      res
        .status(400)
        .send({ code: 400, message: "No se ha podido rear el post" });
    } else {
      res.status(200).send({ code: 200, message: "Post creado correctamente" });
    }
  });
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" }
  };
  Post.paginate({}, options, (err, postsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!postsStored) {
      res
        .status(404)
        .send({ code: 404, message: "No se han encontrado posts" });
    } else {
      res.status(200).send({ code: 200, posts: postsStored });
    }
  });
}

function getPost(req, res) {
  const { url } = req.params;

  Post.findOne({ url }, (err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!postStored) {
      res.status(404).send({
        code: 404,
        message: "No se han encontrado ningún post"
      });
    } else {
      res.status(200).send({ code: 200, post: postStored });
    }
  });
}

function updatePost(req, res) {
  const postData = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, postData, (err, postUpdated) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!postUpdated) {
      res.status(404).send({
        code: 404,
        message: "No se han encontrado ningún post"
      });
    } else {
      res
        .status(200)
        .send({ code: 200, message: "Post actualizado correctamente" });
    }
  });
}

function deletePost(req, res) {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (err, postDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!postDeleted) {
      res.status(404).send({
        code: 404,
        message: "No se han encontrado ningún post"
      });
    } else {
      res
        .status(200)
        .send({ code: 200, message: "Post eliminado correctamente" });
    }
  });
}

module.exports = {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};
