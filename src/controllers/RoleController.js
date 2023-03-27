/*
@RoleController.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const roleModel = require('../models/RoleModel');

class RoleController {
    //Create a role and insert in mongo db
    insertRole = async (req, res) => {
        const role = req.body;
        const getRole = await roleModel.findOne({'role':role.role});
        if (!getRole) {
            const newRole = await roleModel.create(role);
            res.json({
                'message':`Role ${role.role} was created`,
                'info': newRole });
        } else {
            res.status(409).json({ message: 'Role already exists' });
        }
    };

    //Get all roles from mongo db
    getAllRoles = async(req, res) => {
        const roles = await roleModel.find();
        res.json(roles);
    };

    //Get a role by name from mongo db
    getRoleByName = async (req, res) => {
        const data = req.params.name;
        const role = await roleModel.findOne({'name': data});
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.json(role);
        }
    };

    //Update a role by name
    updateRoleByName = async (req, res) => {
        const name = req.params;
        const role = await roleModel.findOneAndUpdate(name, req.body);
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send('Role was updated successfully');
        }
    };

    //Delete a rol by name from mongo db
    deleteRoleByName = async (req, res) => {
        const name = req.params;
        const role = await roleModel.findOneAndDelete(name);
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send('Role was delete successfully');
        }
    };

    //Assign an user to role by name
    assignUserToRole = async (req, res) => {
        const name = req.params;
        const {user} = req.body;
        const role = await roleModel.findOneAndUpdate(name, {$push:{user:user}});
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${role.name} updated with a rol successfully`);
        }
    };

    //Remove an user to role by name
    removeUserToRole = async (req, res) => {
        const name  = req.params;
        const {user} = req.body;
        const role = await roleModel.findOneAndUpdate(name, {$pull:{user:user}});
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`The user with role ${role.name} was removed successfully`);
        }
    };
}
module.exports = RoleController;