const express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
// create express app
const app = express();
// Add headers before the routes are defined for the CORS restriction
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", false);
  next();
});
// Setup server port
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Require user routes
const userRoutes = require("./src/routes/user.routes");
// using as middleware
app.use("/users", userRoutes);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
