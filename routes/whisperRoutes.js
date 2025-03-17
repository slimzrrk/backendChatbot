const express = require('express');
const multer = require('multer');
const path = require('path');
const { transcribe } = require('../controllers/WhisperController');

const router = express.Router();

// Config multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, 'audio_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/transcribe', upload.single('audio'), transcribe);

module.exports = router;
