const mongoose = require("mongoose");

const Cadastro = mongoose.model("Cadastro", {
    email: "String",
    senha: "String",
    telefone: "String",
    privilegio: "String"
})

module.exports = Cadastro;