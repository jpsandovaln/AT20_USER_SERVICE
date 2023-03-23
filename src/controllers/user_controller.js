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
const model = require('../models/user_model.js');
const infoModel = require('../models/personalInfoModel.js');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

class UserController {
    //Create a user and insert it in mongo db
    registerUser = async (req, res) => {
        const newUser = req.body;
        const userName = newUser.userName;
        const userLastName = newUser.lastName;
        const userEmail = newUser.email;
        const newUserName = `${userName}.${userLastName}`;
        const userNameSearch = await model.findOne({'userName': newUserName}).exec();
        const userEmailSearch = await model.findOne({'email':userEmail}).exec();
        if (!userNameSearch && !userEmailSearch) {
            const user = {};
            user.uuid = uuid();
            user.userName = newUserName;
            user.email = userEmail;
            const newPassword = 'at20123';
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            const registeredUser = await model.create(user);
            res.status(201).json(registeredUser);
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    };

    login = async (req, res) => {
        const userName = req.body.userName;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const userNameSearch = await model.findOne({'userName':userName}).exec();
        const userEmailSearch = await model.findOne({'email':userEmail}).exec();
        const userLogin = userNameSearch || userEmailSearch;
        if (!userLogin) {
            res.status(404).json({ message: 'User not found' });
        } else {
            if (await bcrypt.compare(userPassword, userLogin.password)) {
                res.json({message: 'Login Succesful!'});
            } else {
                res.json({message: 'Wrong password'});
            }
        }
    };

    updatePassword = async (req, res) => {
        const uuid  = req.params.id;
        const userPassword = req.body.password;
        const newPassword = req.body.newPassword;
        const userLogin = await model.findOne({'uuid':uuid}).exec();
        if (bcrypt.compare(userPassword, userLogin.password)) {
            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            await model.findOneAndUpdate({'uuid': uuid}, {'password':newHashedPassword});
            res.status(200).send({ message: 'Password was updated successfully' });
        } else {
            res.status(404).json({ message: 'Wrong password' });
        }
    };

    //Get all users from mongo db
    getAllUsers = async(req, res) => {
        // const users = await model.find().populate('roles', {
        //     name: 1,
        //     description: 1
        // });
        const users = await model.find();
        res.json(users);
    };

    //Get a user by Id from mongo db
    getUserById = async (req, res) => {
        const data = req.params.id;
        const user = await model.findOne({'uuid': data});
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    };

    //Update an user by Id
    updateUser = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndUpdate(id, req.body);
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.status(200).send('User was updated successfully');
        }
    };

    //Delete an user by Id from mongo db
    deleteUserById = async (req, res) => {
        const id  = req.params;
        const user = await model.findOneAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send('User was delete successfully');
        }
    };

    addPersonalInfo = async (req, res) => {
        const uuid  = req.params.id;
        const info = req.body;
        const newInfo = await infoModel.create(info);
        const user = await model.findOneAndUpdate({'uuid': uuid}, {$push:{personalInfo:newInfo}});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${user.userName} info updated successfully`);
        }
    };

    //Assign a role to user by Id
    assignRoleToUser = async (req, res) => {
        const id  = req.params.id;
        const {roles} = req.body;
        const user = await model.findOneAndUpdate({'uuid': id}, {$push:{roles:roles}});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${user.userName} updated with a rol successfully`);
        }
    };

    //Remove role to user by Id
    removeRoleToUser = async (req, res) => {
        const id  = req.params.id;
        const {roles} = req.body;
        const user = await model.findOneAndUpdate(id, {$pull:{roles:roles}});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`The role for ${user.name} was removed successfully`);
        }
    };
}
module.exports = UserController;