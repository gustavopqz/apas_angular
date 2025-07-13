const express = require("express");
const router = express.Router();

const Patrocinios = require('../models/Patrocionios')

/**
 * @swagger
 * /patrocinios:
 *   get:
 *     tags:
 *       - Patrocínios
 *     summary: Retorna todos os patrocínios cadastrados
 *     description: Retorna uma lista de todos os patrocínios disponíveis no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de patrocínios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   patrocinador:
 *                     type: string
 *                     example: "Empresa XYZ"
 *                   email:
 *                     type: string
 *                     example: "contato@empresaxyz.com"
 *                   valor:
 *                     type: number
 *                     example: 10000
 *                   mensagem:
 *                     type: string
 *                     example: "Ótima ONG!"
 *                   img:
 *                     type: string
 *                     example: "http://localhost:9000/imagens/patrocinador.png"
 *                   url:
 *                     type: string
 *                     example: "http://www.empresaxyz.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-23T19:20:30.127Z"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Erro ao buscar patrocínios"
 */
router.get('/', async (req, res) => {
    try {
        let todosPatrocinios = await Patrocinios.find({});
        res.status(200).json(todosPatrocinios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar patrocínios', error: error.message });
    }
});

/**
 * @swagger
 * /patrocinios:
 *   post:
 *     tags:
 *       - Patrocínios
 *     summary: Cadastra um novo patrocinador
 *     description: Registra um novo patrocinador com as informações fornecidas. Os campos obrigatórios são `patrocinador` e `email`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patrocinador
 *               - email
 *             properties:
 *               patrocinador:
 *                 type: string
 *                 example: "Empresa XYZ"
 *               email:
 *                 type: string
 *                 example: "contato@empresa.xyz"
 *               valor:
 *                 type: number
 *                 example: 1000.00
 *               mensagem:
 *                 type: string
 *                 example: "É um prazer apoiar este projeto!"
 *               img:
 *                 type: string
 *                 example: "https://empresa.xyz/logo.png"
 *               url:
 *                 type: string
 *                 example: "https://empresa.xyz"
 *     responses:
 *       201:
 *         description: Patrocinador cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "O patrocinador Empresa XYZ foi cadastrado!"
 *       400:
 *         description: JSON inválido ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente."
 *       500:
 *         description: Erro ao cadastrar o patrocinador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/', async (req, res)=>{
    let { patrocinador, email, valor, mensagem, img, url } = req.body;

    if (!patrocinador || !email ){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const dataAtual = new Date;

    let patrocinadorObj = {
        patrocinador,
        email,
        valor,
        mensagem,
        img,
        url,
        createdAt: dataAtual
    };

    try {
        await Patrocinios.create(patrocinadorObj);
        res.status(201).json({ "message": `O patrocinador ${patrocinador} foi cadastrado!`});
        return;
        
    } catch (error) {
        res.status(500).json({ "message": `Algo deu errado!`});
        return;
    }
})

module.exports = router;