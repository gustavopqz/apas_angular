const mongoose = require("mongoose");

const Administrador = mongoose.model("Administrador", {
    nome: "String",
    email: "String",
    senha: "String",
    img: "String",
    privilegio: "String"
});

module.exports = Administrador;
