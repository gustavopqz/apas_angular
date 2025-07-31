const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res)=>{
    // Token
    const token = process.env.IGTOKEN;

    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=media_url,media_type,caption,permalink&access_token=${token}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: 'Erro'});
    }
})

module.exports = router;