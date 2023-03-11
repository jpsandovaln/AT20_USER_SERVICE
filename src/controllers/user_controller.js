const express = require('express');

//call the model user
const model = require('../models/user_model');

const controller = express();

// array to store user data
let users = [];

exports.insertUser = (req, res) => {
    const { id, name, role, description, email } = req.body;
    //this save in mongo db
    const data = req.body;
    model.create(data);
    //until here
    const newUser = { id, name, role, description, email };
    users.push(newUser);
    res.json(newUser);
    //show users in console
    // console.log(users.length);
    // console.log(Object.values(users));
};

exports.getAllUsers = async(req, res) => {
    //res.send('hello from controller');
    // await model.find(function(err, models) {
    //     if (err) return console.error(err);
    //     console.log(models);
    // });
    const users = await model.find();
    console.log(users);
};
