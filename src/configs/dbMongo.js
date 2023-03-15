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
const uri = 'mongodb://127.0.0.1:27017/crudMongo';

class MongoDb {
    //Method for connection with data base mongo db
    dbConnectMongo = async () => {
        try {
                await mongoose.connect(uri ,{
                keepAlive : true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Db connected to successfully');
        } catch (error) {
            console.error(error);
        }
    };
}
module.exports = MongoDb;