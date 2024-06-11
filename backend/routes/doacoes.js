const express = require("express");
const router = express.Router();

const Doacoes = require('../models/Doacoes')

router.get('/', async (req, res)=>{

    let todasDoacoes = await Doacoes.find({})
    res.status(200).json(todasDoacoes);

})


router.get('/feed', async (req, res)=>{

    let todasDoacoesConcluidas = await Doacoes.find({"conclusao": true, "tipoDoacao": 'usuario'})
    res.status(200).json(todasDoacoesConcluidas);
    return;

})

router.get('/concluidas', async (req, res)=>{

    let todasDoacoesConcluidas = await Doacoes.find({"conclusao": true})
    res.status(200).json(todasDoacoesConcluidas);
    return;

})

router.post('/cadastro', async (req, res)=>{
    let { id_pagamento ,doadorNome, tipoDoacao, email, valor, mensagem, img, descricao } = await req.body;

    if (!valor){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const dataAtual = new Date;

    let doacoesObj = {
        id_pagamento,
        doadorNome,
        tipoDoacao,
        email,
        valor,
        mensagem,
        img,
        descricao,
        conclusao: false,
        data: dataAtual
    };

    try {
        await Doacoes.create(doacoesObj);
        res.status(201).json({ "mensagem": `A doação de ${doadorNome} foi salva com sucesso!`});
        return;
    } catch (error) {
        res.status(500).json({ "mensagem": `Algo deu errado!`});
        return;
    }
})

router.patch('/aprovacao', async (req, res) =>{
    let { id_pagamento, status } = req.body;

    if (!id_pagamento || !status){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    try {
        let doacao = await Doacoes.findOne({id_pagamento});
        if(!doacao){
            return { "mensagem": "Doação não encontrada"}
        }else 
        if (status = 'approved'){
            doacao.conclusao = status;
        }

        // Filter
        let filter = {id_pagamento}

        // Update
        let update = { $set: { conclusao: true } }

        await Doacoes.updateOne(filter, update)

        res.status(200).json({"mensagem": `Doação ${id_pagamento} atualizada com sucesso!`})
        return;

    } catch (error) {
        res.status(500).json({ "mensagem": `Algo deu errado!`});    
        return;
    }

});

module.exports = router;