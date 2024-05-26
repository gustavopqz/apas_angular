// Express imports
const express = require("express");
const app = express();

// Middlewars imports
const cors = require("cors");
const bodyParser = require("body-parser");

// DB Import
const mongoose = require("mongoose");

// Import routes
const doacoes = require("./routes/doacoes");
const gastos = require("./routes/gastos");

// Middlewars
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Enviroments variabels
require('dotenv').config()
const user = process.env.USER
const pass = process.env.PASS
const cluster = process.env.CLUSTER

// Rotas
app.get('/', (req, res)=>{
    res.send('{ "teste": "niver de dede" }');
})

// Router
app.use('/doacoes', doacoes);
app.use('/gastos', gastos);

//DB connection
const connection = mongoose.connect(`mongodb+srv://${user}:${pass}@${cluster}.gvpzqhx.mongodb.net/apas`)
if(connection){
    console.log('Conectado to MongoDB');
}

// Serve
app.listen(3000, ()=>{
    console.log('Escutando na porta 3000');
})