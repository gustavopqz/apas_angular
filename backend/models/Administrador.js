const mongoose = require("mongoose");

const Administrador = mongoose.model("Administrador", {
    id: "String",
    nome: "String",
    email: "String",
    senha: "String",
    img: "String",
    privilegio: "String"
});

module.exports = Administrador;