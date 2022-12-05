const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Get all users
router.get("/", userController.getUsers);
// Create a new user
router.post("/", userController.create);
// Update a user
router.put("/", userController.update);
// Delete a user by id
router.delete("/:id", userController.delete);

module.exports = router;
