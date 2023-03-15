const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role_controller');

const roleController = new RoleController();

//endpoint to create a rol
router.post(
    '/roles',
    roleController.insertRole
);

// endpoint to get all roles
router.get(
    '/roles',
    roleController.getAllRoles
);

//endpoint to get role by name
router.get(
    '/roles/:name',
    roleController.getRoleByName
);

//endpoint to put a role by name
router.put(
    '/roles/:name',
    roleController.updateRoleByName
);

//endpoint to delete a role by name
router.delete(
    '/roles/:name',
    roleController.deleteRoleByName
);

//endpoint to assign a role a user by ID
router.put(
    '/roles/assign/:id',
    roleController.assignUserToRole
);
module.exports = router;