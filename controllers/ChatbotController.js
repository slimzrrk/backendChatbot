const { getOpenAIResponse } = require('../services/openaiService');
const { getHistory } = require('../services/chatMemory');
const { detectIntent } = require('../services/intentService');

const askOpenAI = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message ou userId manquant' });
  }

  try {
    const history = getHistory(userId);

    const intent = await detectIntent(message); // 💡 Détection de l’intention
    console.log("🎯 Intention détectée :", intent);

    const reply = await getOpenAIResponse(userId, message, history);
    res.json({ reply });
  } catch (error) {
    console.error('Erreur OpenAI:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { askOpenAI };
