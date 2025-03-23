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
const pass = process.env.PASSWORD

// DB connection
async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${pass}@cluster.5v80ino.mongodb.net/apas`);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

connectToDatabase();

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
const usuario = require("./routes/usuario")
const profile = require('./routes/profile')
const recupera = require('./routes/recuperar')

// Routes
app.use('/doacoes', doacoes);
app.use('/patrocinios', patrocinios);
app.use('/gastos', gastos);
app.use('/administradores', administrador);
app.use('/login', login);
app.use('/usuarios', usuario);
app.use('/profile', profile);
app.use('/recupera', recupera);

// Serve
app.listen(9000, ()=>{
    console.log('Escutando na porta 9000');
})