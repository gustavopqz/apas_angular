const mongoose = require("mongoose");

const Usuario = mongoose.model("Usuario", {
    nome: String,
    email: "String",
    senha: "String",
    img: "String",
    privilegio: "String"
})

module.exports = Usuario;