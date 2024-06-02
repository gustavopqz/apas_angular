const express = require("express");
const router = express.Router();

router.post('/', async (req, res)=>{
    let myBody = req.body;

    console.log(myBody)

    try {
        res.status(201).json(myBody);        
    } catch (error) {
        res.status(500).json({ "message": `Algo deu errado!`});
    }
})

module.exports = router;