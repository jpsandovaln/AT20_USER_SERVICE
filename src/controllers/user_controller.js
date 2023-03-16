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
const model = require('../models/user_model');

class UserController{
    //Create an user and insert in mongo db
    insertUser (req, res) { 
        const user = req.body;
        model.create(user);
        res.json(user);
    };

    //Get all users from mongo db
    getAllUsers = async(req, res) => {
        const users = await model.find().populate('roles',{
            name: 1,
            description: 1
        });
        res.json(users);
    };

    //Get a user by Id from mongo db
    getUserById = async (req, res) => {
        const data = req.params.id;
        const user = await model.findOne({"id": data}).populate('roles',{
            name: 1,
            description: 1
        });;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    }

    //Update an user by Id
    updateUser = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} updated successfully`);
        }
    }

    //Delete an user by Id from mongo db
    deleteUserById = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndDelete(id)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} was delete successfully`);
        }
    }

    //Assign a role to user by Id
    assignRoleToUser = async (req, res) => {
        const id  = req.params;
        const {roles} = req.body;
        const user = await model.findOneAndUpdate(id, {$push:{roles:roles}})
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${user.name} updated with a rol successfully`);
        }
    }
    
    //Remove role to user by Id    
    removeRoleToUser = async (req, res) => {
        const id  = req.params;
        const {roles} = req.body;
        const user = await model.findOneAndUpdate(id, {$pull:{roles:roles}})
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`The role for ${user.name} was removed successfully`);
        }
    }
}
module.exports = UserController;