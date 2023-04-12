/*
@UserModeljs
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const mongoose = require('mongoose');
//Create user schema
const userSchema = new mongoose.Schema (
    {
        globalID: {
            type: String,
            unique: true
        },
        userName:{
            type: String,
            unique: true
        },
        phone: {
            type: String,
        },
        email:{
            type: String,
            unique: true
        },
        firstPassword: {
            type: String,
        },
        password: {
            type: String,
        },
        image: {
            type: String,
        },

        role:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'role'
        },
        personalInfo:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'personalInfo'
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model('user', userSchema);