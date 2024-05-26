const express = require("express");
const router = express.Router();

const Gastos = require('../models/Gastos')

router.get('/', async (req, res)=>{
    let id = await req.query._id;

    if (id){
        let gastos = await Gastos.findOne({ "id": _id })
        res.status(200).json(gastos);
    }

    let todosGastos = await Gastos.find({})
    res.status(200).json(todosGastos);

})

router.post('/', async (req, res)=>{
    let { data, descricao, valor } = await req.body;

    if (!data || !descricao || !valor){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    let gastosObj = {
        data,
        descricao,
        valor
    };

    try {
        await Gastos.create(gastosObj);
        res.status(201).json({ "message": `O gasto foi salvo com sucesso!`});
        
    } catch (error) {
        res.status(500).json({ "message": `Algo deu errado!`});
    }
})

module.exports = router;