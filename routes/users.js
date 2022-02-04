
const fs = require('fs');
const path = require('path');
//
const express = require('express');
const router = express.Router();
//
let rawUsers = fs.readFileSync(path.resolve(__dirname, 'usersData.json'));
const usersDB = JSON.parse(rawUsers);


router.get('/all', (request, response) => {
    const size = request.query.size

    if (size) {
        response.json({
            message: "Ejecutaste el size",
            size
        })
    } else {
        response.json(usersDB)
    }
});

router.get('/:id', (request, response) => {
    const userID = request.params.id;
    let userRequested = null;

    usersDB.forEach((item) => {
        if (item.id === parseInt(userID)) {
            userRequested = item;
        }
    });

    if (userRequested) {
        response.json(userRequested)
    } else {
        response.status(404).json({
            message: "User not found whit id: " + userID,
        })
    }
});

router.get('/querys', (request, response) => {
    const { id, options, name } = request.query;
    response.json({
        id, options, name
    });
});

router.post('/', (request, response) => {
    const { id, name, surname, username, phone } = request.query;
    // const newUser = request.query;

    let newUser = {
        "id": id,
        "name": name,
        "surname": surname, 
        "username": username, 
        "phone": phone
    };

    rawUsers.push(newUser);

    // rawUsers.id = id;
    // rawUsers.name = name;
    // rawUsers.surname = surname;
    // rawUsers.username = username;
    // rawUsers.phone = phone;

    response.status(201).json({
        message: "User created succesfully",
    })
});

router.put('/', (request, response) => {
    response.json({
        message: "Hello from PUT method"
    })
});

router.delete('/', (request, response) => {
    response.json({
        message: "Hello from DELETE method"
    })
});


module.exports = router;
