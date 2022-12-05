var dbConn = require("./../../config/db.config");

var UserObject = function (user) {
  this.id = user.id;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.age = user.age;
};

UserObject.getUsers = (result) => {
  dbConn.query("SELECT * FROM users_table", function (err, res, fields) {
    if (err) {
      result({ error: true, message: err });
    } else {
      result(null, res);
    }
  });
};

UserObject.create = function (newUser, result) {
  dbConn.query(
    "INSERT INTO `user_system`.`users_table`(`firstName`,`lastName`,`age`) VALUES (?,?,?)",
    [newUser.firstName, newUser.lastName, newUser.age],
    function (err, res) {
      if (err) {
        result({ error: true, message: err });
      } else {
        result(null, {
          error: false,
          message: "User Created!",
          insertId: res.insertId,
        });
      }
    }
  );
};

UserObject.update = function (newUser, result) {
  dbConn.query(
    "UPDATE `user_system`.`users_table` SET `firstName`=?,`lastName`=?,`age`=? WHERE `id`=?",
    [newUser.firstName, newUser.lastName, newUser.age, newUser.id],
    (err, res) => {
      if (err) {
        result({ error: true, message: err });
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ error: true, message: "User not found!" });
        return;
      }

      result(null, { error: false, message: "User updated!" });
    }
  );
};

UserObject.delete = function (id, result) {
  dbConn.query(
    "DELETE FROM `user_system`.`users_table` WHERE id=?",
    id,
    (err, res) => {
      if (err) {
        result({ error: true, message: err });
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ error: true, message: "User not found!" });
        return;
      }

      result(null, { error: false, message: "Deleted successfully!" });
    }
  );
};

module.exports = UserObject;
