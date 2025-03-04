const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "jdsdhwuTjaskl787453GKHn";

exports.createAccessTokenApi = function(user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment()
      .add(3, "hours")
      .unix()
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.refreshAccessTokenApi = function(user) {
  const payload = {
    id: user._id,
    exp: moment()
      .add(30, "days")
      .unix()
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodedToken = function(token) {
  return jwt.decode(token, SECRET_KEY, true);
};
