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

    getUserById = async (req, res) => {
        const data = req.params.id;
        const user = await model.findOne({"id": data});
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
        console.log(user);
    }

    updateUser = async (req, res) => {
        const { id } = req.params;
        const user = await model.findOneAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} updated successfully`);
        }
    }

    deleteUserById = async (req, res) => {
        const { id } = req.params;
        const user = await model.findOneAndDelete(id)
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${id} was delete successfully`);
        }
    }

    assignRoleToUser = async (req, res) => {
        const { id } = req.params;
        const {roles} = req.body;
        const user = await model.findOneAndUpdate(id, {$push:{roles:roles}})
        if (!user) {
            res.status(404).json({ message: 'user not found' });
        } else {
            res.send(`User ${user.name} updated with a rol successfully`);
        }
    }
}

module.exports = UserController;