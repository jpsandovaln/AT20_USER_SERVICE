const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// array to store user data
let users = [];

app.post("/users", (req, res) => {
    const { id, name, email } = req.body;
    const newUser = { id, name, email };
    users.push(newUser);
    res.json(newUser);
});

// endpoint to read all users
app.get('/users', (req, res) => {
    res.json(users);
});

//endpoint to read a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// endpoint to update a user by ID
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    }
});

// endpoint to delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    }
});

// Start the server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});