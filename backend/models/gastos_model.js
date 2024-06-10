const mongoose = require("mongoose");

const GastosSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    }
});

const Gastos = mongoose.model("Gastos", GastosSchema);

module.exports = Gastos;
