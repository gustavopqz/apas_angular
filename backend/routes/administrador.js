const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario')

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
