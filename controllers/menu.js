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

function updateMenu(req, res) {
  let menuData = req.body;
  const params = req.params;
  Menu.findByIdAndUpdate(params.id, menuData, (err, menusUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!menusUpdated) {
      res.status(404).send({ message: "No se ha encontrado ningún menú" });
    } else {
      res.status(200).send({ message: "Menú actualizado correctamente" });
    }
  });
}

function activateMenu(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (err, menusStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!menusStored) {
      res.status(404).send({ message: "No se ha encontrado el menú" });
    } else if (active === true) {
      res.status(200).send({ message: "Menú activado correctamente" });
    } else {
      res.status(200).send({ message: "Menú desactivado correctamente" });
    }
  });
}

function deleteMenu(req, res) {
  const { id } = req.params;

  Menu.findByIdAndRemove(id, (err, menuDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else if (!menuDeleted) {
      res.status(404).send({ message: "Menú no encontrado" });
    } else {
      res.status(200).send({ message: "Menú eliminado correctamente" });
    }
  });
}

module.exports = {
  addMenu,
  getMenus,
  updateMenu,
  activateMenu,
  deleteMenu
};
