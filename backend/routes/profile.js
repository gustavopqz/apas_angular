const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../profiles'));
    },
    filename: (req, file, cb) => {
      // Gera um nome de arquivo único usando a data atual e um hash aleatório
      const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });
  
  // Configuração do multer com filtro de tipo de arquivo
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/png', 'image/jpeg'];
      if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Tipo de arquivo inválido.'));
      } else {
        cb(null, true);
      }
    }
  });

/**
 * @swagger
 * /profile:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Faz upload da imagem de perfil do usuário
 *     description: Recebe um arquivo de imagem enviado pelo usuário no formato multipart/form-data. O campo deve se chamar `file`.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "nome-da-imagem.jpg"
 *       400:
 *         description: Nenhum arquivo enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum arquivo enviado."
 */
router.post('/', upload.single('file'), async (req, res)=>{
    if (req.file) {
        const fileName = req.file.filename;
        res.json({ success: fileName });
    } else {
        res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }
})

/**
 * @swagger
 * /profile/{imageName}:
 *   get:
 *     tags:
 *       - Upload
 *     summary: Recupera uma imagem de perfil
 *     description: Retorna o arquivo de imagem armazenado no servidor com base no nome passado como parâmetro na URL.
 *     parameters:
 *       - in: path
 *         name: imageName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo da imagem (com extensão)
 *         example: "gustavo.jpg"
 *     responses:
 *       200:
 *         description: Imagem retornada com sucesso
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Imagem não encontrada"
 */
router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../profiles/' + imageName);
  
    res.sendFile(imagePath, err => {
      if (err) {
        res.status(404).json({message: 'Imagem não encontrada'});
      }
    });
});

/**
 * @swagger
 * /profile/patrocinadores/{imageName}:
 *   get:
 *     tags:
 *       - Upload
 *     summary: Recupera a imagem de um patrocinador
 *     description: Retorna a imagem de um patrocinador armazenada no servidor, com base no nome do arquivo passado como parâmetro na URL.
 *     parameters:
 *       - in: path
 *         name: imageName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo da imagem (com extensão)
 *         example: "empresa-logo.png"
 *     responses:
 *       200:
 *         description: Imagem retornada com sucesso
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Image not found"
 */
router.get('/patrocinadores/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../patrocinadores/' + imageName);

  res.sendFile(imagePath, err => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
});


module.exports = router;