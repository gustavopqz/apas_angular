const mongoose = require("mongoose");

const Token = mongoose.model("Token", {
    token: String,
    validade: Date
});

module.exports = Token;
