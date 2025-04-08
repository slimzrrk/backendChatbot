const db = require('../models');

/**
 * Récupère l'historique complet d'un utilisateur depuis la base de données
 * @param {string} userId - Identifiant unique de l'utilisateur
 * @returns {Promise<Array>} - Liste des messages
 */
const getHistory = async (userId) => {
  try {
    const historyRecords = await db.ChatbotInteraction.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit: 10
    });

    if (!historyRecords || !Array.isArray(historyRecords)) {
      console.error('❌ L\'historique récupéré n\'est pas un tableau.');
      return [];
    }

    return historyRecords.map(record => ({
      role: record.user_id === userId ? 'user' : 'assistant',
      content: record.message || record.response || '',
      intent: record.intent || null,
      matiere: record.matiere || null,
      niveau: record.niveau || null,
      created_at: record.created_at
    }));
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l\'historique :', error.message);
    return [];
  }
};


/**
 * Enregistre un nouveau message dans l'historique de l'utilisateur
 * @param {string} userId - Identifiant unique de l'utilisateur
 * @param {string} message - Message de l'utilisateur
 * @param {string} response - Réponse du chatbot
 */
const addToHistory = async (userId, message, response) => {
  await db.ChatbotInteraction.create({
    user_id: userId,
    message,
    response,
    created_at: new Date()
  });
};

module.exports = { getHistory, addToHistory };

