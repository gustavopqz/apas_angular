const express = require("express");
const router = express.Router();

// const Doacoes = require('../models/Doacoes')

router.get('/', async (req, res)=>{
    res.send('ok')
})

router.post('/', async (req, res)=>{
    res.send('ok')
})

module.exports = router;