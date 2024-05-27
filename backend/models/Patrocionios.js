const mongoose = require("mongoose");

const Patrocinios = mongoose.model("Patrocinios", {
    id: "Number",
    patrocinador: "String",
    email: "String",
    valor: "Number",
    mensagem: "String",
    img: "String",
    url: "String"
})

module.exports = Patrocinios;