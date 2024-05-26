const express = require("express");
const router = express.Router();

const Administrador = require('../models/Administrador');

router.get('/', async (req, res) => {
    let email = req.query.email;

    if (email) {
        try {
            let administrador = await Administrador.findOne({ "email": email });
            res.status(200).json(administrador);
        } catch (error) {
            res.status(500).json({ "message": "Algo deu errado!" });
        }
    } else {
        try {
            let todosAdministradores = await Administrador.find({});
            res.status(200).json(todosAdministradores);
        } catch (error) {
            res.status(500).json({ "message": "Algo deu errado!" });
        }
    }
});

router.post('/cadastro', async (req, res) => {
    let { id, nome, email, senha, img} = await req.body;
    

    if (!id || !nome || !email || !senha) {
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const administrador = await Administrador.findOne({"email" : email})

    if(administrador){
        res.status(400).json({ "mensagem": "Este email já existe." });
        return;
    }

    let administradorObj = {
        id,
        nome,
        email,
        senha,
        img
    };

    try {
        await Administrador.create(administradorObj);
        res.status(201).json({ "message": `O administrador ${nome} foi salvo com sucesso!` });
    } catch (error) {
        res.status(500).json({ "message": "Algo deu errado!" });
    }
});

module.exports = router;
