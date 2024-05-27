const mongoose = require("mongoose");

const Login = mongoose.model("Login", {
    email: "String",
    senha: "String"
})

module.exports = Login;