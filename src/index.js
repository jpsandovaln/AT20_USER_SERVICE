const express = require("express");
const dotenv = require('dotenv');
const userRouter = require('./routes/user_route');
const roleRouter = require('./routes/role_route');
const bodyParser = require('body-parser');
const MongoDb = require('./configs/dbMongo');

const app = express();
dotenv.config();

app.get('/api/v1/', (req, res) => {
    res.send('hello from the home');
});

//for the inputs from body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
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