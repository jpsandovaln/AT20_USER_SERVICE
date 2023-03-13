//call the model user
const model = require('../models/user_model');

class UserController{
    insertUser (req, res) { 
        const data = req.body;
        model.create(data);
        res.json(data);
    };

    getAllUsers = async(req, res) => {
        const users = await model.find();
        res.json(users);
        console.log(users);
    };
}

module.exports = UserController;