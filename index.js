//
const express = require('express');
const routerAPI = require('./routes');
const PORT = 3000;

const app = express();

app.get('/', (request, response) => {
    response.send("Hola Mundo")
});

routerAPI(app);

app.listen(PORT, () => {
    console.log(`Running app in port: http://127.0.0.1:${PORT}`)
});
