const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

function signUp(req, res) {
  console.log("endpoint de signup");
}

module.exports = {
  signUp,
};
