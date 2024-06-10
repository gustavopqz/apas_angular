const express = require("express");
const router = express.Router();
const Gastos = require('../models/Gastos');

// Rota para obter todos os gastos
router.get('/', async (req, res) => {
    try {
        const gastos = await Gastos.find({});
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter os gastos", error: error.message });
    }
});

// Rota para adicionar um novo gasto
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
