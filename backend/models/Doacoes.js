const mongoose = require("mongoose");

const Doacoes = mongoose.model("Doacoes", {
    id: "String",
    doadorNome: "String",
    email: "String",
    valor: "Number",
    mensagem: "String",
    img: "String",
    descricao: "String",
    data: "Date"
})

module.exports = Doacoes;