const chatHistories = {};

function getHistory(userId) {
  if (!chatHistories[userId]) {
    chatHistories[userId] = [
        {
            role: 'system',
            content: 'أنت مساعد ذكي للأطفال. يجب أن تجيب باللغة العربية الفصحى فقط، بأسلوب مبسط ومشجع ومناسب للأطفال.',
          }
          
    ];
  }
  return chatHistories[userId];
}

function addToHistory(userId, role, content) {
  if (!chatHistories[userId]) {
    getHistory(userId);
  }
  chatHistories[userId].push({ role, content });
}

module.exports = { getHistory, addToHistory };
