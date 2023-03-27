/*
@PersonalInfoController.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const personalInfoModel = require('../models/PersonalInfoModel.js');
const userModel = require('../models/UserModel.js');

class PersonalInfoController {
    //Gets all the info documents
    getAllInfo = async(req, res) => {
        const roles = await personalInfoModel.find();
        res.json(roles);
    };
    //Adds personal info to a user by it's Id
    addPersonalInfo = async (req, res) => {
        const globalID  = req.params.id;
        const info = req.body;
        const user = await userModel.findOne({'globalID': globalID});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            const newInfo = await personalInfoModel.create(info);
            const updatedUser = await userModel.findOneAndUpdate({'globalID': globalID}, {$push:{personalInfo:newInfo}});
            res.json({'message':`User ${updatedUser.userName} info updated successfully`,
                        "info":updatedUser
                    });
        }
    };
    //Updates the user with a personal info docuemnt
    updatePersonalInfo = async (req, res) => {
        const globalID = req.params.id;
        const newInfo = req.body;
        const user = await userModel.findOne({'globalID': globalID});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            const id = user.personalInfo;
            const personalInfo = await personalInfoModel.findOne({'_id': id});
            personalInfo.city = newInfo.city || personalInfo.city;
            personalInfo.city = newInfo.city || personalInfo.city;
            personalInfo.age = newInfo.age || personalInfo.age;
            personalInfo.description = newInfo.description || personalInfo.description;
            await personalInfo.save();
            await user.save();
            res.json({"message":`User ${user.userName} personal info updated successfully`,
                        "info": user
                    });
            
        }
    };
    //Removes the user's personal info document
    removePersonalInfo = async (req, res) => {
        const globalID  = req.params.id;
        const user = await userModel.findOne({'globalID': globalID});
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            user.personalInfo = undefined;
            await user.save();
            res.json({"message":`The personal info for ${user.userName} was removed successfully`});
        }
    };
}
module.exports = PersonalInfoController;