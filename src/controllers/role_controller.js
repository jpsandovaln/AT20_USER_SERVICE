const model = require('../models/role_model');

class RoleController{
    insertRole (req, res) { 
        const data = req.body;
        model.create(data);
        res.json(data);
    };

    getAllRoles = async(req, res) => {
        const roles = await model.find().populate('user');
        res.json(roles);
        console.log(roles);
    };

    getRoleByName = async(req, res) => {
        const data = req.params.name;
        const role = await model.findOne({"name": data});
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.json(role);
        }
        console.log(role);
    }

    updateRoleByName = async(req, res) => {
        const { name } = req.params;
        const role = await model.findOneAndUpdate(name, req.body)
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${name} updated successfully`);
        }
    }

    deleteRoleByName = async(req, res) => {
        const { name } = req.params;
        const role = await model.findOneAndDelete(name)
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`Role ${name} was delete successfully`);
        }
    }

    assignUserToRole = async (req, res) => {
        const { name } = req.params;
        const {user} = req.body;
        const role = await model.findOneAndUpdate(name, {$push:{user:user}})
        if (!role) {
            res.status(404).json({ message: 'role not found' });
        } else {
            res.send(`role ${role.name} updated with a rol successfully`);
        }
    }
}
module.exports = RoleController;