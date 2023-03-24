/*
@PersonalInfoModel.js
Copyright ( 2021 Jalasoft 2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const mongoose = require ('mongoose');

//Creates personal Info schema
const personalInfoSchema =  new mongoose.Schema (
    {
        firstName: {
            typre: String,
        },
        lastName: {
            typre: String,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        age: {
            type: Number,
        },
        description: {
            type: String
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model('personalInfo', personalInfoSchema);