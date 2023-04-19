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
const loggerService = require('../../loggerService.js');
const mongoose = require('mongoose');
// const uri = 'mongodb://127.0.0.1:27017/crudMongo';
// const uri = 'mongodb://root:example@mongo:27017/crudMongo';
// const uri = 'mongodb://mongo:27017/myapp?authSource=admin&directConnection=true';
// const uri = 'mongodb://root:example@mongo:27017/myapp?authSource=admin&directConnection=true';
const uri = 'mongodb://127.0.0.1:27017/user';

const ops_mongo = {
    keepAlive : true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
console.log(ops_mongo);
class MongoDb {
    //Method for connection with data base mongo db
    dbConnectMongo = async () => {
        try {
            await mongoose.connect(uri);
            loggerService.info('connected to DB successfully');
        } catch (error) {
            loggerService.error(error);
        }
    };
}
module.exports = MongoDb;