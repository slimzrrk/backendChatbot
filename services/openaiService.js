const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Envoie le message à GPT avec tout l'historique de la conversation
 * @param {string} userId - Identifiant unique de l’utilisateur
 * @param {string} message - Message actuel de l’utilisateur
 * @param {Array} chatHistory - Historique complet (array de { role, content })
 * @returns {string} - Réponse générée par GPT
 */
const getOpenAIResponse = async (userId, message, chatHistory) => {
  // ✅ Si l'historique est vide ou non fourni, on initialise un tableau vide
  chatHistory = chatHistory || [];

  // ✅ Ajoute un message système si ce n'est pas déjà fait
  if (!chatHistory.some(msg => msg.role === 'system')) {
    chatHistory.unshift({
      role: 'system',
      content: 'أنت مساعد ذكي للأطفال. يجب أن تجيب باللغة العربية الفصحى فقط، بأسلوب مبسط ومشجع ومناسب للأطفال.',
    });
  }

  // Ajoute le message utilisateur à l'historique
  chatHistory.push({ role: 'user', content: message });

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: chatHistory,
  });

  const reply = chatCompletion.choices[0].message.content;

  // Ajoute la réponse de l’IA à l’historique
  chatHistory.push({ role: 'assistant', content: reply });

  return reply;
};

module.exports = { getOpenAIResponse };
