// implement your API here

// import express from 'express'; // ES6 Modules
const express = require('express'); // CommonJS Modules, equivalent to above

const usersModel = require('./data/db');  //<< require data access

const server = express();

//teach express how to read JSON from the request body
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Node Project 1 GET')

});

server.get('/users', (req, res) => {
    //get a list of users from the database

    console.log(res.id);

    usersModel
        .find()
        .then(users => {
            //send the list of users back to the client
            res.send(users);
            res.status(201);

        }).catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." });

        });
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    usersModel
        .findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            else { res.send(user) }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." });
        });


});

server.post('/users', (req, res) => {
    // get the user data from the request
    const userData = req.body;


    if (!userData.name || !userData.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    else {
        usersModel
            .insert(userData)


            .then(user => {
                res.status(201).json(user)  //Always use .JSON

            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            })
    }

    //add the user to the database


});


server.delete('/users/:id', (req, res) => {
    //axios.delete('/users/2')
    const id = req.params.id;

    usersModel
        .remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            else { res.json(user) }  //Always use .JSON

        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" });
        });

});

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    usersModel
        .update(id, changes)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            else {
                res.status(200).json(user);

            }  //Always use .JSON

        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." });
        });
});

const port = 5000;
server.listen(port, () => console.log(`'\n ' ** API on port ${port}** \n`));

//yarn add express
//yarn server