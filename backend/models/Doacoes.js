const mongoose = require("mongoose");

const Doacoes = mongoose.model("Doacoes", {
    id_pagamento: String,
    doadorNome: String,
    tipoDoacao: String,
    email: String,
    valor: Number,
    mensagem: String,
    img: String,
    descricao: String,
    data: Date,
    conclusao: Boolean
})

module.exports = Doacoes;