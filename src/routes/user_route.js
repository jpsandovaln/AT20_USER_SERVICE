const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller');

const userController = new UserController();

//endpoint to create an user
router.post(
    '/users',
    userController.insertUser
);

// endpoint to read all users
router.get(
    '/users',
    userController.getAllUsers
);

//endpoint to read a single user by ID
router.get(
    '/users/:id',
    userController.getUserById
);
 //endpoint to update an user by ID
router.put(
    '/users/:id',
    userController.updateUser
);

// endpoint to delete a user by ID
router.delete(
    '/users/:id',
    userController.deleteUserById
);

//endpoint to assign a role a user by ID
router.put(
    '/users/assign/:id',
    userController.assignRoleToUser
);


module.exports = router;