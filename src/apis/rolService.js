const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

let roles = [];


app.post('/api/v1/roles', (req, res) => { // CREATE: Add a new role
    const role = req.body;
    roles.push(role);
    res.send(`Role ${role.name} added successfully`);
});


app.get('/api/v1/roles', (req, res) => { // READ: Get all roles
    res.send(roles);
});

app.put('/api/v1/roles/:name', (req, res) => { // UPDATE: Update a role by name
    const { name } = req.params;
    const updatedRole = req.body;
    const index = roles.findIndex(role => role.name === name);
    if (index !== -1) {
        roles[index] = updatedRole;
        res.send(`Role ${name} updated successfully`);
    } else {
        res.status(404).send(`Role ${name} not found`);
    }
});


app.delete('/api/v1/roles/:name', (req, res) => {// DELETE: Delete a role by name
    const { name } = req.params;
    const index = roles.findIndex(role => role.name === name);
    if (index !== -1) {
        roles.splice(index, 1);
        res.send(`Role ${name} deleted successfully`);
    } else {
        res.status(404).send(C);
    }
});

app.get('/api/v1/roles/:index', (req, res) => { //Read: get a rle by index
    const {index} = req.params;
    const role = roles[index];
    if (role) {
        res.send(role);
    } else {
        res.status(404).send('Role at index ${index} not found.');
    }
});

app.listen(port, function(error) {
    if(error) {
        console.log(`Something wnet wrong`, error) 
    } else {
        console.log(`Server is listening on port`, + port)
    }
})