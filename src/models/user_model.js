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
const mongoose = require('mongoose');

//Create user schema
const userSchema = new mongoose.Schema (
    {
        uuid: {
            type: String,
            unique: true
        },
        userName:{
            type: String,
            unique: true
        },
        roles:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'rol'
        },
        email:{
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model('user', userSchema);