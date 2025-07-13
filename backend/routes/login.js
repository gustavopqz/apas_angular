const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario')

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realiza o login de administradores ou usuários
 *     description: Verifica se o e-mail pertence a um administrador ou usuário, compara a senha e retorna os dados de perfil ou uma mensagem de erro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: "gustavo.pasqua@hotmail.com"
 *               senha:
 *                 type: string
 *                 example: "minhaSenhaSegura123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso ou senha incorreta
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                       example: "Gustavo Pasqua"
 *                     email:
 *                       type: string
 *                       example: "gustavo.pasqua@hotmail.com"
 *                     img:
 *                       type: string
 *                       example: "https://link.da.imagem.com/foto.jpg"
 *                     privilegio:
 *                       type: string
 *                       example: "admin"
 *                 - type: object
 *                   properties:
 *                     mensagem:
 *                       type: string
 *                       example: "Senha incorreta"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
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