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

router.post('/', upload.single('file'), async (req, res)=>{
    if (req.file) {
        const fileName = req.file.filename;
        res.json({ success: fileName });
    } else {
        res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }
})

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../profiles/' + imageName);
  
    res.sendFile(imagePath, err => {
      if (err) {
        res.status(404).send('Image not found');
      }
    });
});


module.exports = router;