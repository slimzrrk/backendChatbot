require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatbotRoutes = require('./routes/chatbotRoutes');
const whisperRoutes = require('./routes/whisperRoutes');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Créer le dossier uploads s’il n'existe pas
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

// Routes API
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/whisper', whisperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Node lancé sur http://localhost:${PORT}`);
});
