const UserObject = require("./../models/user.model");

exports.getUsers = function (req, result) {
  UserObject.getUsers(function (err, users) {
    if (err) result.send(err);
    result.send(users);
  });
};

exports.create = function (req, result) {
  const newUser = new UserObject(req.body);
  //handles null error
  if (!req.body) {
    result
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    UserObject.create(newUser, function (err, data) {
      if (err) result.status(500).send(err);
      result.send(data);
    });
  }
};

exports.update = function (req, result) {
  if (!req.body) {
    result
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  }

  UserObject.update(new UserObject(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        result.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        result.status(500).send({
          message: "Error updating user with id " + req.params.id,
        });
      }
    } else result.send(data);
  });
};

exports.delete = function (req, result) {
  UserObject.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        result.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        result.status(500).send({
          message: "Could not delete user with id " + req.params.id,
        });
      }
    }
    result.send(data);
  });
};
