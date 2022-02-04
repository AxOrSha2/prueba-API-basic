//
const fs = require('fs');
const path = require('path');
//
const express = require('express');
const router = express.Router();
//
let rawInputs = fs.readFileSync(path.resolve(__dirname, 'inputs.json'));
const inputsDB = JSON.parse(rawInputs);


router.get('/', (request, response) => {
    const inputID = request.query.id;
    let inputRequested = null;

    if (inputID) {
        inputsDB.forEach((item) => {
            if (item.id === parseInt(inputID)) {
                inputRequested = item;
            }
        });

        if (inputRequested) {
            response.json(inputRequested)
        } else {
            response.json({
                message: "input not found whit id: " + inputID,
                statusCode: "404"
            })
        }

    } else {
        response.json(inputsDB)
    }
});

module.exports = router;