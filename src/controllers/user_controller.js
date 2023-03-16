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
    //Method for create an user and insert in mongo db
    insertUser (req, res) { 
        const user = req.body;
        model.create(user);
        res.json(user);
    };

    //Method for get all users from mongo db
    getAllUsers = async(req, res) => {
        const users = await model.find().populate('roles',{
            name: 1,
            description: 1
        });
        res.json(users);
    };

    //Method for get a user by Id from mongo db
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

    //Method for update an user by Id
    updateUser = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} updated successfully`);
        }
    }

    //Method for delete an user by Id from mongo db
    deleteUserById = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndDelete(id)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} was delete successfully`);
        }
    }

    //Method for assign a role to user by Id
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
    
    //Method for remove role to user by Id    
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