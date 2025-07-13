const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario')

/**
 * @swagger
 * /administradores:
 *   get:
 *     tags:
 *       - Administrador
 *     summary: Busca administradores
 *     description: Retorna os dados de um administrador com base no e-mail fornecido como parâmetro de consulta (query param). Caso nenhum e-mail seja informado, retorna todos os administradores.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: E-mail do administrador a ser buscado
 *         example: gustavo.pasqua@hotmail.com
 *     responses:
 *       200:
 *         description: Administrador encontrado ou lista de todos os administradores
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
 *                     senha:
 *                       type: string
 *                     privilegio:
 *                       type: string
 *                     __v:
 *                       type: number
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
 *                       senha:
 *                         type: string
 *                       privilegio:
 *                         type: string
 *                       __v:
 *                         type: number
 *                   example:
 *                     - _id: "67d8eb30d16858cecf28efa7"
 *                       nome: "Gustavo Pasqua"
 *                       email: "gustavo.pasqua@hotmail.com"
 *                       senha: "$2a$08$qzFP/PGd8HSCEw.1BsxN6O0m1y8heFHPtgSnfjn8Q6N8snW7ugmdu"
 *                       privilegio: "admin"
 *                       __v: 0
 *                 - type: object
 *                   properties:
 *                     mensagem:
 *                       type: string
 *                       example: "Administrador não encontrado"
 *       500:
 *         description: Erro ao buscar administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.get('/', async (req, res) => {
    let email = req.query.email;

    if (email) {
        try {
            let administrador = await Administrador.findOne({ "email": email });
            if (administrador) res.status(200).json(administrador)
            else res.status(200).json({"mensagem": "Administrador não encontrado"})
        } catch (error) {
            res.status(500).json({ "mensagem": "Algo deu errado!" });
        }
    } else {
        try {
            let todosAdministradores = await Administrador.find({});
            res.status(200).json(todosAdministradores);
        } catch (error) {
            res.status(500).json({ "mensagem": "Algo deu errado!" });
        }
    }
});

/**
 * @swagger
 * /administradores/cadastro:
 *   post:
 *     tags:
 *       - Administrador
 *     summary: Cadastra um novo administrador
 *     description: Recebe os dados de um administrador e realiza o cadastro, desde que o e-mail ainda não esteja em uso por outro administrador ou usuário.
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
 *                 example: "Gustavo Pasqua"
 *               email:
 *                 type: string
 *                 example: "gustavo.pasqua@hotmail.com"
 *               senha:
 *                 type: string
 *                 example: "minhaSenhaSegura123"
 *               img:
 *                 type: string
 *                 example: "https://link.da.imagem.com/foto.jpg"
 *     responses:
 *       201:
 *         description: Administrador cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O administrador Gustavo Pasqua foi cadastrado com sucesso!"
 *       400:
 *         description: Dados ausentes ou e-mail já existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente."
 *       500:
 *         description: Erro ao cadastrar administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/cadastro', async (req, res) => {
    let { nome, email, senha, img } = await req.body;
    

    if ( !nome || !email || !senha) {
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const administrador = await Administrador.findOne({"email" : email})
    const usuario = await Usuario.findOne({"email" : email})    

    if(administrador || usuario){
        res.status(400).json({ "mensagem": "Este email já existe." });
        return;
    }

    const salt = await bcrypt.genSalt(8)
    const senhaEncriptada = await bcrypt.hash(senha, salt)

    let administradorObj = {
        nome,
        email,
        senha: senhaEncriptada,
        img,
        privilegio: 'admin'
    };

    try {
        await Administrador.create(administradorObj);
        res.status(201).json({ "mensagem": `O administrador ${nome} foi cadastrado com sucesso!` });
    } catch (error) {
        res.status(500).json({ "mensagem": "Algo deu errado!" });
    }
});

module.exports = router;
