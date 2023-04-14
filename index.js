const express = require('express');
const fs = require('fs');
const { trafficSinal, turnonLed } = require('./utils/led.js');

const app = express();
const port = 8080;
const host = "localhost";
const serverMessage = `Server listen on http://${host}:${port}`;

app.use(express.static('pages'));
app.use(express.json());

app.get('/', (req, res) => {
    const page = fs.readFileSync('./pages/index.html');
    //trafficSinal(60);
    res.end(page);
});

app.get('/turnon/:color', (req, res) => {
    const color = req.params.color;
    turnonLed(color);
    res.json({ message: 'sucesso!' });
});

app.get('/turnon-sinal/:seconds', (req, res) => {
    const seconds = Number(req.params.seconds);
    trafficSinal(seconds);
    res.json({ message: 'sucesso!' });
});

app.listen(port, host, () =>{
    console.log(serverMessage);
});

