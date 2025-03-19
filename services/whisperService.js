const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const { franc } = require('franc');
const langs = require('langs');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * 🔍 Détecte la langue dominante d'un texte avec franc
 */
const detectLangFromText = (text) => {
  const langCode = franc(text);
  const langData = langs.where('3', langCode);
  return langData ? langData['1'] : 'fr';
};

/**
 * 🎧 Convertit un fichier audio en WAV avec qualité optimisée
 */
const convertToWav = (inputPath) => {
  const outputPath = inputPath.replace(path.extname(inputPath), '.wav');
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFrequency(44100)
      .audioChannels(1)
      .audioBitrate('128k')
      .toFormat('wav')
      .on('end', () => {
        console.log('✅ Conversion terminée :', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('❌ Erreur FFmpeg :', err);
        reject(err);
      })
      .save(outputPath);
  });
};

/**
 * 🧠 Appelle le microservice Python pour clarifier le texte
 */
const FormData = require('form-data');

const clarifyWithPython = async (wavPath) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(wavPath));

  const response = await axios.post('http://localhost:8002/clarify', formData, {
    headers: formData.getHeaders(), // ← fonctionne avec `form-data` de Node.js
  });

  return response.data.text;
};

/**
 * 🔁 Transcrit un audio, détecte la langue et reformule le texte
 */
const transcribeAudio = async (filePath) => {
  console.log('🔍 Conversion audio...', filePath);
  const wavPath = await convertToWav(filePath);

  const clarifiedText = await clarifyWithPython(wavPath);
  const lang = detectLangFromText(clarifiedText);

  console.log('🌐 Langue détectée :', lang);
  console.log('🧠 Texte reformulé :', clarifiedText);

  fs.unlinkSync(wavPath);

  return {
    text: clarifiedText,
    language: lang,
  };
};

module.exports = { transcribeAudio };
