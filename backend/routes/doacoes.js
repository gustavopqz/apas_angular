const express = require("express");
const router = express.Router();

const Doacoes = require('../models/Doacoes')

// Variáveis de ambiente
const tokenMercadoPago = process.env.TOKENMERCADOPAGO;

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
    let { id_preferencia ,doadorNome, tipoDoacao, email, valor, mensagem, img, descricao } = await req.body;

    if (!valor){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    const dataAtual = new Date;

    let doacoesObj = {
        id_preferencia,
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

router.post('/mercado-pago', async (req, res) => {

    const { valorDoacao } = req.body;

    if (!valorDoacao){
        res.status(400).json({"mensagem": "O valor da doação não pode ser nulo."})
    }

    let objMercadoPago = {      
        "items": [
          {
            "title": "Doação para APAS",
            "quantity": 1,
            "unit_price": valorDoacao,
            "currency_id": "BRL"        
          }
        ],
        "back_urls": {
            "success": "http://localhost:4200/#/doacoes",
            "pending": "http://localhost:4200/#/doacoes",
            "failure": "http://localhost:4200/#/doacoes"
        }
    }

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenMercadoPago}`, 
            },
            body: JSON.stringify(objMercadoPago)
        });

        const data = await response.json();

        jsonResponse = {
            id: data.id,
            url: data.init_point,
            sandbox_url: data.sandbox_init_point,
            valor: data.items[0].unit_price            
        }
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
    
})

router.patch('/aprovacao', async (req, res) =>{
    let { id_pagamento, tipo_pagamento, id_preferencia, status } = req.body;

    console.log(id_pagamento);

    if (!id_pagamento || !tipo_pagamento || !id_preferencia || !status){
        res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
        return;
    }

    if(tipo_pagamento == 'credit_card'){
        try {
            let doacao = await Doacoes.findOne({id_preferencia});
            if(!doacao){
                return { "mensagem": "Doação não encontrada"}
            }
    
            // Filter
            let filter = {id_preferencia}
    
            // Update
            let update = { $set: { conclusao: true, id_pagamento: id_pagamento } }
    
            await Doacoes.updateOne(filter, update)
    
            res.status(200).json({"mensagem": `Doação ${id_preferencia} atualizada com sucesso!`})
            return;
    
        } catch (error) {
            res.status(500).json({ "mensagem": `Algo deu errado!`});    
            return;
        }
    } else
    if (tipo_pagamento == 'bank_transfer'){
        try{
            const resposta = await fetch(`https://api.mercadopago.com/v1/payments/${id_pagamento}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenMercadoPago}`, 
                }, 
            });

            const data = await resposta.json();
            let status_api = data.status;

            if(status_api == 'approved'){
                let doacao = await Doacoes.findOne({id_preferencia});
                if(!doacao){
                    return { "mensagem": "Doação não encontrada"}
                }
        
                // Filter
                let filter = {id_preferencia}
        
                // Update
                let update = { $set: { conclusao: true, id_pagamento: id_pagamento } }
        
                await Doacoes.updateOne(filter, update)
        
                res.status(200).json({"mensagem": `Doação ${id_preferencia} atualizada com sucesso!`});
                return;
            }
        } catch (error){
            res.status(500).json({ "mensagem": `Algo deu errado!`});    
            return;
        } 
    } else {
        res.status(200).json({"mensagem": `Tipo de doação não encontrado!`});
        return;
    }
    
});

module.exports = router;