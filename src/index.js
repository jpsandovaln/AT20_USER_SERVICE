const express = require("express");
const dotenv = require('dotenv');

const user = require('./routes/user_route');

const dbConnectMongo = require("./configs/dbMongo");

const app = express();
dotenv.config();

app.get('/api/v1/', (req, res) => {
    res.send('hello from the home');
});

//routes
app.use('/api/v1/user', user);

//Db connection
dbConnectMongo();

// Start the server
const port = process.env.PORT || 9090; 
app.listen(port, () => {
    console.log('The app is online');
});