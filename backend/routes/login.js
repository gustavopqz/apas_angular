const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const axios = require('axios')

router.post('/', async (req, res)=>{
    let { email, senha } = req.body;

    const adminAPI = 'http://localhost:9000/administrador?email=';
    const usuarioAPI = 'http://localhost:9000/usuario?email='
    
    try {
        const responseAdmin = await axios.get(adminAPI + email);
        const data = responseAdmin.data;

        const validaSenha = await bcrypt.compare(senha, data.senha);

        if(validaSenha){
            res.status(200).json(data);
            return;      
        }else {
            res.status(200).json({"mensagem": "Senha incorreta"});
            return; 
        }
    } catch (error) {
        //pass
    }

    try {
        const responseUse = await axios.get(usuarioAPI + email);
        const data = responseUse.data; 
        
        const validaSenha = await bcrypt.compare(senha, data.senha);

        if(validaSenha){
            res.status(200).json(data);
            return;       
        }else {
            res.status(200).json({"mensagem": "Senha incorreta"})
            return; 
        } 
    } catch (error) {
        res.status(200).json({"mensagem": "Erro ao tentar efetuar login"});
        return; 
    }
})

module.exports = router;