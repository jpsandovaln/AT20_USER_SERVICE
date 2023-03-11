const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/crudMongo';

const dbConnectMongo = async() => {
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

module.exports = dbConnectMongo;