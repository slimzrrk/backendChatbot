const { transcribeAudio } = require('../services/whisperService');

const transcribe = async (req, res) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Aucun fichier audio envoyé.' });
    }

    const transcription = await transcribeAudio(audioFile.path);
    res.json({ transcription });
  } catch (error) {
    console.error('Erreur Whisper:', error);
    res.status(500).json({ error: 'Erreur lors de la transcription.' });
  }
};

module.exports = { transcribe };
