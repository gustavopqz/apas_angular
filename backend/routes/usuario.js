const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const Usuario = require("../models/Usuario");

router.get('/', async (req, res) => {
    let email = req.query.email;

    if (email) {
        try {
            let usuario = await Usuario.findOne({ "email": email });
            if (usuario) res.status(200).json(usuario)
            else res.status(400).json({"message": "Usuário não encontrado"})
        } catch (error) {
            res.status(500).json({ "message": "Algo deu errado!" });
            return;
        }
    } else {
        try {
            let todosUsuarios = await Usuario.find({});
            res.status(200).json(todosUsuarios);
            return;
        } catch (error) {
            res.status(500).json({ "message": "Algo deu errado!" });
            return;
        }
    }
});

router.post('/cadastro', async (req, res)=>{
    let { nome, email, senha, img } = req.body;

    const usuario = await Usuario.findOne({"email": email});
    if(usuario){
        res.status(400).json({"mensangem": "Esse e-mail já existe"});
        return;
    }
    const senhaSalt = await bcrypt.genSalt(8);
    const senhaHash = await bcrypt.hash(senha, senhaSalt);

    let cadastroObj = {
        nome,
        email,
        senha: senhaHash,
        img: img ? img : "",
        privilegio: 'comum'
    };

    try {
        await Usuario.create(cadastroObj);
        res.status(201).json({"mensagem": `O usuário com ${email} foi criado com sucesso`});
        return;
    } catch(error){
        res.status(500).json({"mensagem": "Algo deu errado"});
        return;
    }
})

module.exports = router;