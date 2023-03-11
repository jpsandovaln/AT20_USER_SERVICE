const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// array to store user data
let users = [];

router.post("/users", (req, res) => {
    const { id, name, role, description, email } = req.body;
    const newUser = { id, name, role, description, email };
    users.push(newUser);
    res.json(newUser);
    //show users in console
    console.log(users.length);
    console.log(Object.values(users));
});

// endpoint to read all users
router.get('/users', (req, res) => {
    res.json(users);
});

//endpoint to read a single user by ID
router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// endpoint to update a user by ID
router.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    }
});

// endpoint to delete a user by ID
router.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    }
});






module.exports = router;