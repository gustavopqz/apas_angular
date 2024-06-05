// Express imports
const express = require("express");
const app = express();

// Middlewars imports
const cors = require("cors");
const bodyParser = require("body-parser");

// DB Import
const mongoose = require("mongoose");

// Middlewars
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Enviroments variabels
require('dotenv').config()
const user = process.env.USER
const pass = process.env.PASS
const cluster = process.env.CLUSTER

//DB connection
const connection = mongoose.connect(`mongodb+srv://${user}:${pass}@${cluster}.gvpzqhx.mongodb.net/apas`)
if(connection){
    console.log('Conectado to MongoDB');
}

// Rotas
app.get('/', (req, res)=>{
    res.send('{ "mensagem": "Backend APAS está online!" }');
})

// Import routes
const doacoes = require("./routes/doacoes");
const patrocinios = require("./routes/patrocinios")
const gastos = require("./routes/gastos");
const administrador = require("./routes/administrador");
const login = require("./routes/login");
const cadastro = require('./routes/cadastro')
const webhook = require('./routes/webhook')

// Routes
app.use('/doacoes', doacoes);
app.use('/patrocinios', patrocinios);
app.use('/gastos', gastos);
app.use('/administrador', administrador);
app.use('/login', login);
app.use('/cadastro', cadastro);
app.use('/webhook', webhook);

// Serve
app.listen(9000, ()=>{
    console.log('Escutando na porta 9000');
})