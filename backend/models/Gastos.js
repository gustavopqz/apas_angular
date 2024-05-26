const mongoose = require("mongoose");

const Gastos = mongoose.model("Gastos", {
    data: "Date",
    descricao: "String",
    valor: "Number"
})

module.exports = Gastos;