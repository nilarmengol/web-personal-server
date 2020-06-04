const Menu = require("../models/menu");

function addMenu(req, res) {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!createdMenu) {
      res.status(404).send({ message: "Error del servidor" });
    } else {
      res.status(200).send({ message: "Menu creado correctamente" });
    }
  });
}

function getMenus(req, res) {
  User.find().then(users => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningún usuario" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getMenus(req, res) {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusStored) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (!menusStored) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún elemento en el menú" });
      } else {
        res.status(200).send({ menu: menusStored });
      }
    });
}

module.exports = {
  addMenu,
  getMenus
};
