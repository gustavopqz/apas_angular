const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const Cadastro = require("../models/Cadastro");

router.post('/', async (req, res)=>{
    let { email, senha, telefone, privilegio } = req.body;

    const usuario = await Cadastro.findOne({"email": email});
    if(usuario){
        res.status(400).json({"mensangem": "Esse e-mail já existe"});
    }
    const senhaSalt = await bcrypt.genSalt(8);
    const senhaHash = await bcrypt.hash(senha, senhaSalt);

    let cadastroObj = {
        email,
        senha: senhaHash,
        telefone,
        privilegio
    };

    try {
        await Cadastro.create(cadastroObj);
        res.status(201).json({"mensagem": `O usuário com ${email} foi criado com sucesso`});
    } catch(error){
        res.status(406).json({"mesnagem": "Erro. Usuário não pode ser criado"});
    }
})

module.exports = router;