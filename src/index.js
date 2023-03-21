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
const express = require("express");
const dotenv = require('dotenv');
const userRouter = require('./routes/user_route');
const roleRouter = require('./routes/role_route');
const bodyParser = require('body-parser');
const MongoDb = require('./configs/dbMongo');

const app = express();
dotenv.config();

app.get('/api/v1/', (req, res) => {
    res.send('hello from home');
});

//Middlewares for the inputs from body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);

//Db connection
const mongoDb = new MongoDb();
mongoDb.dbConnectMongo();

// Start the server
const port = process.env.PORT || 9090; 
app.listen(port, () => {
    console.log('The app is online');
});