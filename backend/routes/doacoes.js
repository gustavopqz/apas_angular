const express = require("express");
const router = express.Router();

const Doacoes = require('../models/Doacoes')

// Variáveis de ambiente
const tokenMercadoPago = process.env.TOKENMERCADOPAGO;
const baseUrl = process.env.BASEURL;

/**
 * @swagger
 * /doacoes:
 *   get:
 *     tags:
 *       - Doações
 *     summary: Retorna todas as doacoes cadastradas
 *     description: Retorna uma lista de todas as doacoes disponiveis no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de doacoes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/Doacoes'
 *             examples:
 *               exemplo1:
 *                 value:
 *                   - _id: "67e05efeffeb225cda96a760"
 *                     doadorNome: "João Silva"
 *                     tipoDoacao: "usuario"
 *                     email: "joao.silva@example.com"
 *                     valor: 50
 *                     mensagem: "Apoio a causa e desejo sucesso a todos!"
 *                     img: "http://localhost:9000/profile/file-123456789.png"
 *                     descricao: "Doação feita pelo site."
 *                     data: "2025-03-23T19:20:30.127Z"
 *                     conclusao: true
 *                     __v: 0
 *                     id_preferencia: "1234567890-abcdefg"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar doacoes
 */
router.get('/', async (req, res) => {
    try {
        let todasDoacoes = await Doacoes.find({});
        res.status(200).json(todasDoacoes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar doacoes', error: error.message });
    }
});

/**
 * @swagger
 * /doacoes/feed:
 *   get:
 *     tags:
 *       - Doações
 *     summary: Retorna todas as doacoes concluídas do tipo usuario
 *     description: Retorna uma lista de todas as doacoes concluidas e do tipo usuario.
 *     responses:
 *       200:
 *         description: Lista de doacoes concluídas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/Doacoes'
 *             examples:
 *               exemplo1:
 *                 value:
 *                   - _id: "67e05efeffeb225cda96a760"
 *                     doadorNome: "Maria Oliveira"
 *                     tipoDoacao: "usuario"
 *                     email: "maria.oliveira@example.com"
 *                     valor: 30
 *                     mensagem: "Muito feliz em poder ajudar!"
 *                     img: "http://localhost:9000/profile/file-987654321.png"
 *                     descricao: "Doação de um usuário pelo site."
 *                     data: "2025-03-23T19:20:30.127Z"
 *                     conclusao: true
 *                     __v: 0
 *                     id_preferencia: "9876543210-hgfedcba"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar doacoes
 */
router.get('/feed', async (req, res) => {
    try {
        let todasDoacoesConcluidas = await Doacoes.find({"conclusao": true, "tipoDoacao": 'usuario'});
        res.status(200).json(todasDoacoesConcluidas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar doacoes', error: error.message });
    }
});


/**
 * @swagger
 * /doacoes/concluidas:
 *   get:
 *     tags:
 *       - Doações
 *     summary: Retorna todas as doações concluídas
 *     description: Retorna uma lista de todas as doações concluídas.
 *     responses:
 *       200:
 *         description: Lista de doações concluídas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/Doacoes'
 *             examples:
 *               exemplo1:
 *                 value:
 *                   - _id: "67e05efeffeb225cda96a760"
 *                     doadorNome: "Carlos Pereira"
 *                     tipoDoacao: "usuario"
 *                     email: "carlos.pereira@example.com"
 *                     valor: 100
 *                     mensagem: "Apoio a causa e espero que ajude muitas pessoas!"
 *                     img: "http://localhost:9000/profile/file-234567890.png"
 *                     descricao: "Doação concluída com sucesso."
 *                     data: "2025-03-23T19:20:30.127Z"
 *                     conclusao: true
 *                     __v: 0
 *                     id_preferencia: "2345678901-hgfedcba"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar doações concluídas
 */
router.get('/concluidas', async (req, res) => {
    try {
        let todasDoacoesConcluidas = await Doacoes.find({"conclusao": true});
        res.status(200).json(todasDoacoesConcluidas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar doações concluídas', error: error.message });
    }
});

/**
 * @swagger
 * /doacoes/cadastro:
 *   post:
 *     tags:
 *       - Doações
 *     summary: Cadastra uma nova doação
 *     description: Recebe os dados de uma doação e a cadastra no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_preferencia:
 *                 type: string
 *                 example: "1747749586-e335800d-d589-403f-9b0d-1b1ffa17d8d4"
 *               doadorNome:
 *                 type: string
 *                 example: "Gustavo Pasqua"
 *               tipoDoacao:
 *                 type: string
 *                 example: "usuario"
 *               email:
 *                 type: string
 *                 example: "gustavopqz@hotmail.com"
 *               valor:
 *                 type: number
 *                 example: 100
 *               mensagem:
 *                 type: string
 *                 example: "Fico feliz em poder ajudar!"
 *               img:
 *                 type: string
 *                 example: "http://localhost:9000/profile/file-1742271295692-a81aea0967c3.png"
 *               descricao:
 *                 type: string
 *                 example: "Doação de usuário pelo site"
 *     responses:
 *       201:
 *         description: Doação cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "A doação de Gustavo Pasqua foi salva com sucesso!"
 *       400:
 *         description: Requisição inválida (campos faltando ou incorretos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.post('/cadastro', async (req, res)=>{
    let { id_preferencia, doadorNome, tipoDoacao, email, valor, mensagem, img, descricao } = await req.body;

    if (!id_preferencia, !tipoDoacao, !valor, !descricao){
        return res.status(400).json({ "mensagem": "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente." });
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
        return res.status(201).json({ "mensagem": `A doação de ${doadorNome} foi salva com sucesso!`});        
    } catch (error) {
        return res.status(500).json({ "mensagem": `Algo deu errado!`});
    }
});

/**
 * @swagger
 * /doacoes/mercado-pago:
 *   post:
 *     tags:
 *       - Doações
 *     summary: Cria uma preferência de pagamento no Mercado Pago para uma doação
 *     description: Recebe o valor da doação e cria uma preferência de pagamento no Mercado Pago, retornando a URL para pagamento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorDoacao:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Preferência de pagamento criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "abc123"
 *                 url:
 *                   type: string
 *                   example: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=abc123"
 *                 sandbox_url:
 *                   type: string
 *                   example: "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=abc123"
 *                 valor:
 *                   type: number
 *                   example: 100
 *       400:
 *         description: O valor da doação não pode ser nulo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O valor da doação não pode ser nulo."
 *       500:
 *         description: Erro interno ao tentar criar a preferência de pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar dados"
 */
router.post('/mercado-pago', async (req, res) => {

    const { valorDoacao } = req.body;

    if (!valorDoacao){
        return res.status(400).json({"mensagem": "O valor da doação não pode ser nulo."})
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
            "success": `${baseUrl}/doacoes`,
            "pending": `${baseUrl}/doacoes`,
            "failure": `${baseUrl}/doacoes`
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

        return res.status(200).json(jsonResponse);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
    
});

/**
 * @swagger
 * /doacoes/aprovacao:
 *   patch:
 *     tags:
 *       - Doações
 *     summary: Atualiza o status de aprovação da doação
 *     description: Recebe os dados de pagamento e atualiza o status da doação, marcando-a como concluída se o pagamento for aprovado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pagamento:
 *                 type: string
 *                 example: "1234567890"
 *               tipo_pagamento:
 *                 type: string
 *                 enum: [credit_card, bank_transfer]
 *                 example: "credit_card"
 *               id_preferencia:
 *                 type: string
 *                 example: "9876543210"
 *               status:
 *                 type: string
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Status de doação atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Doação 9876543210 atualizada com sucesso!"
 *       400:
 *         description: O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "O JSON da requisição está incorreto! Faltam campos ou foram digitados erroneamente."
 *       404:
 *         description: Doação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Doação não encontrada"
 *       500:
 *         description: Erro ao tentar atualizar o status da doação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Algo deu errado!"
 */
router.patch('/aprovacao', async (req, res) =>{
    let { id_pagamento, tipo_pagamento, id_preferencia, status } = req.body;

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