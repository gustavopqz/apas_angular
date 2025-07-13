const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Usuario = require('../models/Usuario');
const Administrador = require('../models/Administrador');
const Token = require('../models/Token')

const baseUrl = process.env.BASEURL;

/**
 * @swagger
 * /recuperar:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Solicita recuperação de senha
 *     description: Envia um email com um token para recuperação de senha, caso o email exista no sistema (usuário ou administrador).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@exemplo.com"
 *     responses:
 *       200:
 *         description: Email de recuperação enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email de recuperação enviado"
 *       404:
 *         description: Email não encontrado no sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Email não encontrado!"
 *       500:
 *         description: Erro interno ao processar recuperação de senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/', async (req, res)=>{
    const {email} = req.body;
    
    const usuario = await Usuario.findOne({email});
    const admin = await Administrador.findOne({email});

    if(!usuario && !admin){
        return res.status(404).json({"mensagem": 'Email não encontrado!'});
    }

    const token = await gerarToken();

    await Token.create(token);

    enviarEmailRecuperacao(email, token.token);

    res.status(200).json({message: 'Email de recuperação enviado'});
});

/**
 * @swagger
 * /recuperar/conclusao:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Finaliza a recuperação de senha
 *     description: Atualiza a senha do usuário ou administrador após a validação do email e token (token não exibido aqui, deve ser validado antes).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@exemplo.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Senha alterada com sucesso"
 *       400:
 *         description: Dados da requisição inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Email ou senha inválidos"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno ao alterar a senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/conclusao', async (req, res) =>{
    const { email, senha } = req.body;

    // HASH NOVA SENHA
    const salt = await bcrypt.genSalt(8);
    const senhaEncriptada = await bcrypt.hash(senha, salt);

    // ENCONTRAR USUÁRIO COMUM OU ADMIN
    const usuario = await Usuario.findOne({email});
    const admin = await Administrador.findOne({email});

    // Atualização da senha
    if (usuario){
        await Usuario.updateOne({ email }, {senha: senhaEncriptada});
        res.status(200).json({"mensagem": "Senha alterada com sucesso"});
        return;
    } else if (admin){
        await Administrador.updateOne({ email }, {senha: senhaEncriptada});
        res.status(200).json({"mensagem": "Senha alterada com sucesso"});
        return;
    }
})

/**
 * @swagger
 * /recuperar/valida-token:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Valida o token de recuperação de senha
 *     description: Verifica se o token enviado pelo usuário é válido para permitir a redefinição de senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123def456ghi789"
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token Válido"
 *       400:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Token inválido"
 *       500:
 *         description: Erro interno ao validar token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/valida-token', async (req, res)=>{
    const {token} = req.body;

    const tokenObj = await Token.findOne({token});
    if(!tokenObj){
        return res.status(400).json({"mensagem": 'Token inválido'})
    }

    res.status(200).json({"mensagem": 'Token Válido'});
});

async function gerarToken(){

    const now = new Date();

    const date = now.toLocaleDateString('pt-BR');  // "10/06/2024"
    const time = now.toLocaleTimeString('pt-BR');  // "15:30:00"
    
    function generateHash(input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
    
    const input = 'md18KF2la';
    const hash = generateHash(input);

    const token = {
        token: hash,
        validade: `${date} ${time}`
    }    
    
    return token;
    
};

async function enviarEmailRecuperacao(email, token){
    // Configuração do transporte
    let transporter = nodemailer.createTransport({
        service: 'hotmail', // Você pode usar outros serviços, como 'hotmail', 'yahoo', etc.
        auth: {
        user: 'automatize.sistemas@outlook.com', // Seu e-mail
        pass: process.env.AUTOMATIZE // Sua senha ou app password (recomendado)
        }
    });
    
    // Opções do e-mail
    let mailOptions = {
        from: 'automatize.sistemas@outlook.com', // Endereço do remetente
        to: email, // Lista de destinatários
        subject: 'RECUPERAÇÃO DE SENHA - SISTEMA APAS', // Assunto do e-mail
        text: 'Clique no link abaixo para alterar a sua senha:', // Corpo do e-mail em texto simples
        html: `<h1><a href="http://${baseUrl}/#/altera-senha?email=${email}&token=${token}">Link para recuperação de senha site APAS<a></h1>` // Corpo do e-mail em HTML (opcional)
    };
    
    // Enviando o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log(error);
        }
        console.log('E-mail enviado: ' + info.response);
    });
};

module.exports = router;