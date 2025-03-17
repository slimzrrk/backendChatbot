const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transcribeAudio = async (filePath) => {
  console.log("🔍 Fichier reçu pour conversion :", filePath);

  const outputPath = filePath.replace(path.extname(filePath), '.wav');

  // 🔁 Conversion en WAV avec FFmpeg
  await new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .toFormat('wav')
      .on('end', () => {
        console.log("✅ Fichier converti :", outputPath);
        resolve();
      })
      .on('error', (err) => {
        console.error("❌ Erreur de conversion FFmpeg :", err);
        reject(err);
      })
      .save(outputPath);
  });

  // 🔊 Envoi à Whisper (OpenAI)
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(outputPath),
    model: 'whisper-1',
    language: 'ar',
    response_format: 'text',
  });

  // Optionnel : supprimer les fichiers temporaires
  fs.unlinkSync(outputPath);

  return response;
};

module.exports = { transcribeAudio };
