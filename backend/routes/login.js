const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')

const Login = require('../models/Login');

router.post('/', async (req, res)=>{
    let { email, senha } = req.body 

    const usuario = await Login.findOne({"email": email})

    const senhaHash = usuario.senha //$2a$08$Mcum05hv17hYt/GVmKCbi.9eFZR0gh0mAWE33xucwhIcBgfnyV8Qi
    try {
        const validaSenha = await bcrypt.compare(senha, senhaHash)
        if (validaSenha == true){

        }else{

        }

    } catch (error) {
        
    }

    console.log(email, senha)
    res.send('ok')
    
})

module.exports = router;