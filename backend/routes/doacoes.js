const express = require("express");
const router = express.Router();

const Doacoes = require('../models/Doacoes')

router.get('/', async (req, res)=>{
    let id = await req.query.id;

    if (id){
        let doacao = await Doacoes.findOne({ "id": id })
        res.status(200).json(doacao);
    }

    let todasDoacoes = await Doacoes.find({})
    res.status(200).json(todasDoacoes);
})

router.post('/cadastro', async (req, res)=>{
    let { id, doadorNome, email, valor, mensagem, img } = await req.body;

    if (!id || !doadorNome || !email || !valor || !mensagem){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    let doacoesObj = {
        id,
        doadorNome,
        email,
        valor,
        mensagem,
        img 
    };

    try {
        await Doacoes.create(doacoesObj);
        res.status(201).json({ "message": `A doação de ${doadorNome} foi salva com sucesso!`});
        
    } catch (error) {
        res.status(500).json({ "message": `Algo deu errado!`});
    }
})

module.exports = router;