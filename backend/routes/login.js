const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const Login = require('../models/Login');

router.post('/', async (req, res)=>{
    let { email, senha } = req.body;

    const usuario = await Login.findOne({"email": email});
    if(!usuario){
        res.status(400).json({"mesangem": "E-mail não encontrado"});
    }
    const senhaHash = usuario.senha;
    try {
        const validaSenha = await bcrypt.compare(senha, senhaHash);
        if (validaSenha){
            res.status(200).json({"mensagem": "A senha é valida"});
        }else{
            res.status(400).json({"mensagem": "A senha está incorreta"});
        }
    } catch (error) {
        res.status(400).json({"mensagem": "Erro"});
    }    
})

module.exports = router;