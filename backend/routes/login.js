const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario')

router.post('/', async (req, res)=>{
    let { email, senha } = req.body;

    const admin = await Administrador.findOne({email});
    const usuario = await Usuario.findOne({email});
    
    if (admin) { 

        const validaSenha = await bcrypt.compare(senha, admin.senha);

        const jsonResposta = {
            nome: admin.nome,
            email: admin.email,
            img: admin.img,
            privilegio: admin.privilegio
        }

        if(validaSenha){
            res.status(200).json(jsonResposta);
            return;      
        }else {
            res.status(200).json({"mensagem": "Senha incorreta"});
            return; 
        }
    }

    if (usuario) {
        
        const validaSenha = await bcrypt.compare(senha, usuario.senha);

        const jsonResposta = {
            nome: usuario.nome,
            email: usuario.email,
            img: usuario.img,
            privilegio: usuario.privilegio
        }

        if(validaSenha){
            res.status(200).json(jsonResposta);
            return;       
        }else {
            res.status(200).json({"mensagem": "Senha incorreta"})
            return; 
        } 
    }

    return res.status(404).json({"mensagem": "Usuário não encontrado"})
})

module.exports = router;