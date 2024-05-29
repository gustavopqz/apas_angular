const express = require("express");
const router = express.Router();

const Doacoes = require('../models/Doacoes')

router.get('/', async (req, res)=>{

    let todasDoacoesConcluidas = await Doacoes.find({"conclusao": true, "tipoDoacao": 'usuario'})
    res.status(200).json(todasDoacoesConcluidas);

})

router.get('/todas', async (req, res)=>{

    let todasDoacoes = await Doacoes.find({})
    res.status(200).json(todasDoacoes);

})

router.post('/cadastro', async (req, res)=>{
    let { doadorNome, tipoDoacao, email, valor, mensagem, img, descricao } = await req.body;

    if (!valor){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const dataAtual = new Date;

    let doacoesObj = {
        doadorNome,
        tipoDoacao,
        email,
        valor,
        mensagem,
        img,
        descricao,
        conclusao: false,
        data: dataAtual
    };

    try {
        await Doacoes.create(doacoesObj);
        res.status(201).json({ "message": `A doação de ${doadorNome} foi salva com sucesso!`});
        
    } catch (error) {
        res.status(500).json({ "message": `Algo deu errado!`});
    }
})

module.exports = router;