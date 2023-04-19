/*
@UserController.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
//const personalInfoModel = require('../models/PersonalInfoModel.js');
const userModel = require('../models/UserModel.js');
const roleModel = require('../models/RoleModel.js');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

class UserController {
    //Creates a user and registers it in mongo db
    registerUser = async (req, res) => {
        const newUser = req.body;
        const userName = newUser.userName;
        const userLastName = newUser.lastName;
        const userPhone = newUser.phone;
        const userEmail = newUser.email;
        const userImage = newUser.image;
        const userRol = newUser.rol;
        const newPassword = newUser.password;
        const newUserName = `${userName}.${userLastName}`;
        const userNameSearch = await userModel.findOne({'userName': newUserName});
        const userEmailSearch = await userModel.findOne({'email':userEmail});
        if (!userNameSearch && !userEmailSearch) {
            const user = {};
            user.globalID = uuid();
            user.userName = newUserName;
            user.email = userEmail;
            user.phone = userPhone;
            user.image = userImage;
            const role = await roleModel.findOne({'role': userRol});
            user.role = role;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.firstPassword = hashedPassword;
            user.password = '';
            const registeredUser = await userModel.create(user);
            res.status(201).json({
                message: 'New user registered',
                info: registeredUser});
        } else {
            res.status(409).json({ message: 'User already exists' });
        }
    };

    //Logs in a user according to the user name or email address and the password
    login = async (req, res) => {
        const userName = req.body.userName;
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const userNameSearch = await userModel.findOne({'userName':userName});
        const userEmailSearch = await userModel.findOne({'email':userEmail});
        const userLogin = userNameSearch || userEmailSearch;
        if (!userLogin) {
            res.status(404).json({ message: 'User not found' });
        } else {
            if (userLogin.firstPassword && await bcrypt.compare(userPassword, userLogin.firstPassword)) {
                res.status(409).json({
                    'message': 'Please update your password',
                    'info':`/api/v1/user/updatePassword/${userLogin.globalID}`});
            } else {
                if (await bcrypt.compare(userPassword, userLogin.password)) {
                    res.status(200).json({
                        message: 'Login Succesful!',
                        info: userLogin});
                } else {
                    res.status(409).json({message: 'Wrong password'});
                }
            }
        }
    };

    //Updates a User's password by using the globalID
    updatePassword = async (req, res) => {
        const globalID  = req.params.id;
        const userPassword = req.body.password;
        const newPassword = req.body.newPassword;
        const userLogin = await userModel.findOne({'globalID':globalID});
        if (!userLogin) {
            res.status(404).json({ message: 'User not found' });
        } else {
            if (userLogin.firstPassword && await bcrypt.compare(userPassword, userLogin.firstPassword)) {
                const newHashedPassword = await bcrypt.hash(newPassword, 10);
                await userModel.findOneAndUpdate({'globalID': globalID}, {'password':newHashedPassword});
                userLogin.firstPassword = undefined;
                await userLogin.save();
                res.status(200).send({ "message": 'Password was updated successfully',
                                        "info":userLogin });
            } else {
                if (await bcrypt.compare(userPassword, userLogin.password)) {
                    const newHashedPassword = await bcrypt.hash(newPassword, 10);
                    await userModel.findOneAndUpdate({'globalID': globalID}, {'password':newHashedPassword});
                    res.status(200).json({
                        "message": 'Password was updated successfully',
                         "info":userLogin});
                } else {
                    res.status(404).json({ message: 'Wrong password' });
                }
            }
        }
    };

    //Gets all users from mongo db
    getAllUsers = async(req, res) => {
        const users = await userModel.find();
        res.json(users);
    };

    //Gets a user by Id from mongo db
    getUserById = async (req, res) => {
        const globalID = req.params.id;
        const user = await userModel.findOne({'globalID': globalID}).populate(
        'personalInfo', {
                firstName:1,
                lastName:1,
                city:1,
                country:1,
                age:1,
                description:1,
                createdAt:1,
                updatedAt:1
        }).populate(
            'role',{
                role:1,
                description:1
            });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    };

    //Updates a user's info by Id
    updateUser = async (req, res) => {
        const globalID = req.params.id;
        const newInfo = req.body;
        const user = await userModel.findOne({'globalID': globalID});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            user.phone = newInfo.phone || user.phone;
            user.city = newInfo.email || user.email;
            await user.save();
            res.json({"message":`User ${user.userName} info updated successfully`,
                        "info": user});

        }
    };

    //Deletes a user by Id from mongo db
    deleteUserById = async (req, res) => {
        const globalID  = req.params;
        const user = await userModel.findOneAndDelete(globalID);
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.json({"message":'User was deleted successfully'});
        }
    };

    //Assigns a role to user by Id
    assignRoleToUser = async (req, res) => {
        const globalID  = req.params.id;
        const newRole = req.body.role;
        const role = await roleModel.findOne({'role': newRole});
        const user = await userModel.findOne({'globalID': globalID});
        if (!user || !role) {
            res.status(404).json({ message: 'Not found' });
        } else {
            await userModel.findOneAndUpdate({'globalID': globalID}, {$push:{role:role}});
            res.json({
                "message":`User ${user.userName} updated with a role successfully`,
                "info":user
                });
        }
    };

    //Removes the user's role by Id
    removeRoleToUser = async (req, res) => {
        const globalID = req.params.id;
        const user = await userModel.findOne({'globalID': globalID});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            user.role=undefined;
            user.save();
            res.json({"message":`The role for ${user.userName} was removed successfully`});
        }
    };
}
module.exports = UserController;