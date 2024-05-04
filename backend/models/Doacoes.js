const mongoose = require("mongoose");

const Doacoes = mongoose.model("Doacoes", {
    id: "String",
    doadorNome: "String",
    email: "String",
    valor: "Number",
    mensagem: "String",
    img: "String"
})

module.exports = Doacoes;