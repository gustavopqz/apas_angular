const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

const Doacoes = require('../models/Doacoes')
const Administrador = require('../models/Administrador')

router.post('/', async (req, res)=>{
    const {email} = req.body;
    
    const usuario = await Doacoes.findOne({email});
    const admin = await Administrador.findOne({email});

    if(!usuario && !admin){
        return res.status(200).json({"mensagem": 'Email não encontrado!'});
    }

    const token = gerarToken();

    await RecuperarSenha.updateOne({email}, {token});

    enviarEmailRecuperacao(email, token);

    res.status(200).json({message: 'Email de recuperação enviado'});
});

router.post('/validar-token', async (req, res)=>{
    const {email, token} = req.body;

    const usuario = await RecuperarSenha.findOne({email, token});
    if(!usuario){
        return res.status(400).json({"mensagem": 'Token inválido'})
    }

    res.status(200).json({"mensagem": 'Token Válido'});
});

function gerarToken(){

    const id = bcrypt.randomBytes(32).toString('hex');

    const registroTempo = Date.now();
    const expirar = registroTempo + 1800000; //Tempo para o token expirar
    
    const hash = crypto.creatHash('sha256');

    const token = id + registroTempo + hash + expirar;
    
    return token;
    
};

async function enviarEmailRecuperacao(email, token){
    const transporter = nodemailer.createTransport({
        host: 'apasserrinha.netlify.app',
        port: 9000,
        auth: {
            usuario: 'email',
            pass: '1234'
        }
    });
    const link = '';
    const mensagem = `Olá, clique nesse link para recuperar sua senha: ${link}`;

    await transporter.sendMail({
        from: 'email',
        to: email,
        subject: 'Recuperação de senha',
        text: mensagem
    });
};

module.exports = router;