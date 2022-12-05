"use strict";
const mysql = require("mysql");

const dbConn = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "user_system",
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
