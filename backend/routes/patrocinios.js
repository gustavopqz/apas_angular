const express = require("express");
const router = express.Router();

const Patrocinios = require('../models/Patrocionios')

router.get('/', async (req, res)=>{
    let todosPatrocinios = await Patrocinios.find({})
    res.status(200).json(todosPatrocinios);
})

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