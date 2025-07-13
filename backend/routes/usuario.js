const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const Usuario = require("../models/Usuario");
const Administrador = require('../models/Administrador');

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca usuários
 *     description: Retorna os dados de um usuário com base no e-mail enviado como parâmetro de consulta. Caso nenhum e-mail seja informado, retorna todos os usuários.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: false
 *         description: E-mail do usuário a ser buscado
 *         example: "usuario@exemplo.com"
 *     responses:
 *       200:
 *         description: Usuário encontrado ou lista de todos os usuários
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     senha:
 *                       type: string
 *                     privilegio:
 *                       type: string
 *                     img:
 *                       type: string
 *                       nullable: true
 *                     __v:
 *                       type: number
 *                   example:
 *                     _id: "67d8eb30d16858cecf28efa7"
 *                     nome: "Gustavo Pasqua"
 *                     email: "gustavo.pasqua@hotmail.com"
 *                     senha: "$2a$08$qzFP/PGd8HSCEw..."
 *                     privilegio: "comum"
 *                     img: "imagem.jpg"
 *                     __v: 0
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       senha:
 *                         type: string
 *                       privilegio:
 *                         type: string
 *                       img:
 *                         type: string
 *                         nullable: true
 *                       __v:
 *                         type: number
 *                   example:
 *                     - _id: "67d8eb30d16858cecf28efa7"
 *                       nome: "Gustavo Pasqua"
 *                       email: "gustavo.pasqua@hotmail.com"
 *                       senha: "$2a$08$qzFP/PGd8HSCEw..."
 *                       privilegio: "comum"
 *                       img: "imagem.jpg"
 *                       __v: 0
 *       500:
 *         description: Erro ao buscar usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.get('/', async (req, res) => {
    const email = req.query.email;

    // Usuário único
    if (email) {
        try {
            let usuario = await Usuario.findOne({ email: email });
            if (usuario){
                res.status(200).json(usuario);
                return;
            } 
        } catch (error) {
            //pass
        }
    }

    // Todos usuários
    try {
        let todosUsuarios = await Usuario.find({});
        res.status(200).json(todosUsuarios);
        return;
    } catch (error) {
        res.status(500).json({ "message": "Algo deu errado!" });
        return;
    }
});

/**
 * @swagger
 * /usuarios/cadastro:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastro de usuário comum
 *     description: Cria um novo usuário comum no sistema. Verifica se o e-mail já existe entre usuários e administradores.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao.silva@exemplo.com"
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *               img:
 *                 type: string
 *                 nullable: true
 *                 example: "avatar.jpg"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O usuário com joao.silva@exemplo.com foi criado com sucesso"
 *       200:
 *         description: E-mail já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensangem:
 *                   type: string
 *                   example: "Esse e-mail já existe"
 *       500:
 *         description: Erro interno ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado"
 */
router.post('/cadastro', async (req, res)=>{
    let { nome, email, senha, img } = req.body;

    const usuario = await Usuario.findOne({"email": email});
    const administrador = await Administrador.findOne({"email": email});

    if(usuario || administrador){
        res.status(200).json({"mensangem": "Esse e-mail já existe"});
        return;
    }
    const senhaSalt = await bcrypt.genSalt(8);
    const senhaHash = await bcrypt.hash(senha, senhaSalt);

    let cadastroObj = {
        nome,
        email,
        senha: senhaHash,
        img: img ? img : "",
        privilegio: 'comum'
    };

    try {
        await Usuario.create(cadastroObj);
        res.status(201).json({"mensagem": `O usuário com ${email} foi criado com sucesso`});
        return;
    } catch(error){
        res.status(500).json({"mensagem": "Algo deu errado"});
        return;
    }
})

module.exports = router;