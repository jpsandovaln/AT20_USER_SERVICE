/*
@node_command.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller');
const userController = new UserController();

//Endpoint to create an user
router.post(
    '/register',
    userController.registerUser
);

router.post(
    '/login',
    userController.login
    );

// Endpoint to read all users
router.get(
    '/users',
    userController.getAllUsers
);

//Endpoint to read a single user by ID
router.get(
    '/users/:id',
    userController.getUserById
);
 //Endpoint to update an user by ID
router.put(
    '/users/:id',
    userController.updateUser
);

// Endpoint to delete a user by ID
router.delete(
    '/users/:id',
    userController.deleteUserById
);

//Endpoint to assign a role a user by ID
router.put(
    '/users/assign/:id',
    userController.assignRoleToUser
);

//Endpoint to remove a role to assign a user by ID
router.put(
    '/users/remove/:id',
    userController.removeRoleToUser
);
module.exports = router;