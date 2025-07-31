// Express imports
const express = require("express");
const app = express();

// Middlewars imports
const cors = require("cors");
const bodyParser = require("body-parser");

// DB Import
const mongoose = require("mongoose");

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentação da API usando Swagger',
      },
      servers: [
        {
          url: 'http://localhost:9000',
          description: 'Servidor local',
        },
        {
          url: 'https://apas.sempreautomatize.com.br',
          description: 'Servidor de produção',
        },
      ],
      tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints de login, recuperação de senha, etc.',
      },
      {
        name: 'Usuários',
        description: 'Gerenciamento de usuários',
      },
      {
        name: 'Administrador',
        description: 'Gerenciamento de usuários',
      },
      {
        name: 'Doações',
        description: 'Controle financeiro e despesas',
      },
      {
        name: 'Gastos',
        description: 'Controle financeiro e despesas',
      },
      {
        name: 'Patrocínios',
        description: 'Cadastro e gerenciamento de patrocinadores',
      },
      {
        name: 'Upload',
        description: 'Upload de arquivos',
      }
    ],
    },
    apis: ['./routes/*.js'],
};

// Especificação swagger
const swaggerSpec = swaggerJsdoc(options);

// Rota para servir a UI do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Middlewars
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Enviroments variabels
require('dotenv').config()
const user = process.env.USERDB
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
const patrocinios = require("./routes/patrocinios");
const gastos = require("./routes/gastos");
const administrador = require("./routes/administrador");
const login = require("./routes/login");
const usuario = require("./routes/usuario");
const profile = require('./routes/profile');
const recupera = require('./routes/recuperar');
const refreshToken = require('./routes/refresh-token');

// Public Routes
app.use('/login', login);
app.use('/recupera', recupera);
app.use('/doacoes', doacoes);
app.use('/patrocinios', patrocinios);
app.use('/profile', profile);

// Middleware aplicado a partir daqui: tudo abaixo é protegido
const authMiddleware = require('./middlewares/authenticateToken');
app.use(authMiddleware);

// Protected routes
app.use('/usuarios', usuario);
app.use('/gastos', gastos);
app.use('/administradores', administrador);
app.use('/refreshtoken', refreshToken);

// Serve
app.listen(9000, ()=>{
    console.log('Escutando na porta 9000');
})