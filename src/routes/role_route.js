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
const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role_controller');
const roleController = new RoleController();

//Endpoint to create a rol
router.post(
    '/roles',
    roleController.insertRole
);

// Endpoint to get all roles
router.get(
    '/roles',
    roleController.getAllRoles
);

//Endpoint to get role by name
router.get(
    '/roles/:name',
    roleController.getRoleByName
);

//Endpoint to put a role by name
router.put(
    '/roles/:name',
    roleController.updateRoleByName
);

//Endpoint to delete a role by name
router.delete(
    '/roles/:name',
    roleController.deleteRoleByName
);

//Endpoint to assign a role a user by name
router.put(
    '/roles/assign/:name',
    roleController.assignUserToRole
);

//Endpoint to remove a role to user by name
router.put(
    '/roles/remove/:name',
    roleController.removeUserToRole
);
module.exports = router;