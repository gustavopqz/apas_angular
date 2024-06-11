const mongoose = require("mongoose");

const RecuperarSenha = mongoose.model("RecuperarSenha", {
    email: "String"
})

module.exports = RecuperarSenha;