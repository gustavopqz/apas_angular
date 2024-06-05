const mongoose = require("mongoose");

const Patrocinios = mongoose.model("Patrocinios", {
    patrocinador: String,
    email: String,
    valor: Number,
    mensagem: String,
    img: String,
    url: String,
    createdAt: Date
})

module.exports = Patrocinios;