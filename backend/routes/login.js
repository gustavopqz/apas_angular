const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models
const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario');

// POST /login
router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const admin = await Administrador.findOne({ email });
    const usuario = await Usuario.findOne({ email });

    const pessoa = admin || usuario;

    if (!pessoa) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, pessoa.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    const payload = {
      id: pessoa._id,
      email: pessoa.email,
      privilegio: pessoa.privilegio
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6m' });

    const jsonResposta = {
      nome: pessoa.nome,
      email: pessoa.email,
      img: pessoa.img,
      privilegio: pessoa.privilegio,
      token
    };

    return res.status(200).json(jsonResposta);

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
});

module.exports = router;