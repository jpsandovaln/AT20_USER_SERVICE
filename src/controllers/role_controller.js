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
const model = require('../models/role_model');

class RoleController{
    //Method for create a role and insert in mongo db
    insertRole (req, res) { 
        const role = req.body;
        model.create(role);
        res.json(role);
    };

    //Method for get all roles from mongo db
    getAllRoles = async(req, res) => {
        const roles = await model.find().populate('user',{
            id:1,
            name:1,
            email:1
        });
        res.json(roles);
    };
    
    //Method for get a role by name from mongo db
    getRoleByName = async (req, res) => {
        const data = req.params.name;
        const role = await model.findOne({"name": data}).populate('user',{
            id:1,
            name:1,
            email:1
        });
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.json(role);
        }
    }

    //Method for update a role by name
    updateRoleByName = async (req, res) => {
        const { name } = req.params;
        const role = await model.findOneAndUpdate(name, req.body)
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${name} updated successfully`);
        }
    }

    //Method for delete a rol by name from mongo db
    deleteRoleByName = async (req, res) => {
        const { name } = req.params;
        const role = await model.findOneAndDelete(name)
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${name} was delete successfully`);
        }
    }

    //Method for assign an user to role by name
    assignUserToRole = async (req, res) => {
        const name = req.params;
        const {user} = req.body;
        const role = await model.findOneAndUpdate(name, {$push:{user:user}})
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${role.name} updated with a rol successfully`);
        }
    }

    //Method for remove an user to role by name   
    removeUserToRole = async (req, res) => {
        const name  = req.params;
        const {user} = req.body;
        const role = await model.findOneAndUpdate(name, {$pull:{user:user}})
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`The user with role ${role.name} was removed successfully`);
        }
    }
}
module.exports = RoleController;