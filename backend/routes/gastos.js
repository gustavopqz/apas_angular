const express = require("express");
const router = express.Router();
const Gastos = require('../models/Gastos');

/**
 * @swagger
 * /gastos:
 *   get:
 *     tags:
 *       - Gastos
 *     summary: Lista todos os gastos
 *     description: Retorna uma lista com todos os registros de gastos cadastrados no sistema.
 *     responses:
 *       200:
 *         description: Lista de gastos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   valor:
 *                     type: number
 *                   data:
 *                     type: string
 *                     format: date-time
 *                   categoria:
 *                     type: string
 *                   __v:
 *                     type: number
 *               example:
 *                 - _id: "67da05246d7c13a35e312f97"
 *                   descricao: "Compra de materiais"
 *                   valor: 150.75
 *                   data: "2025-07-10T14:35:22.000Z"
 *                   categoria: "Materiais"
 *                   __v: 0
 *                 - _id: "67da05526d7c13a35e312f98"
 *                   descricao: "Pagamento de serviços"
 *                   valor: 320.00
 *                   data: "2025-07-09T09:12:45.000Z"
 *                   categoria: "Serviços"
 *                   __v: 0
 *       500:
 *         description: Erro ao obter os gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao obter os gastos"
 *                 error:
 *                   type: string
 *                   example: "Erro interno no servidor"
 */
router.get('/', async (req, res) => {
    try {
        const gastos = await Gastos.find({});
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter os gastos", error: error.message });
    }
});

/**
 * @swagger
 * /gastos:
 *   post:
 *     tags:
 *       - Gastos
 *     summary: Adiciona um novo gasto
 *     description: >
 *       Cadastra um novo registro de gasto com os campos obrigatórios: data, descrição e valor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - descricao
 *               - valor
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-10T14:35:22.000Z"
 *               descricao:
 *                 type: string
 *                 example: "Compra de materiais"
 *               valor:
 *                 type: number
 *                 example: 150.75
 *     responses:
 *       201:
 *         description: Gasto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 data:
 *                   type: string
 *                   format: date-time
 *                 descricao:
 *                   type: string
 *                 valor:
 *                   type: number
 *                 __v:
 *                   type: number
 *             example:
 *               _id: "67da05246d7c13a35e312f97"
 *               data: "2025-07-10T14:35:22.000Z"
 *               descricao: "Compra de materiais"
 *               valor: 150.75
 *               __v: 0
 *       400:
 *         description: JSON inválido ou campos ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente."
 *       500:
 *         description: Erro ao cadastrar gasto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Algo deu errado!"
 *                 error:
 *                   type: string
 *                   example: "Erro interno no servidor"
 */
router.post('/', async (req, res) => {
    const { data, descricao, valor } = req.body;

    if (!data || !descricao || !valor) {
        return res.status(400).json({ message: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
    }

    const gasto = new Gastos({
        data,
        descricao,
        valor
    });

    try {
        await gasto.save();
        res.status(201).json(gasto);
    } catch (error) {
        res.status(500).json({ message: "Algo deu errado!", error: error.message });
    }
});

module.exports = router;
