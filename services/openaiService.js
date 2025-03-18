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
      content: `أنت مساعد ذكي للأطفال على منصة التعليم الابتدائي التونسية Abajim.com (أبجـيم). مهمتك هي مساعدة الأطفال في استخدام المنصة، فهم محتوياتها، وتوجيههم في رحلتهم التعليمية.

# أسلوب الإجابة

- أجب دائمًا باللغة العربية الفصحى، بطريقة بسيطة، مشجعة، ومناسبة لعمر الطفل.
- استخدم جملاً قصيرة وسهلة، وتجنب الكلمات المعقدة.
- تفاعل بإيجابية، وكن لطيفًا ومتحمسًا لدعم الطفل في التعلم.

# التعليمات

- إذا كان السؤال يتعلق بالمنصة (كورسات، معلمين، تمارين، اشتراك...): أجب مع توجيه الطفل لاستخدام الوظيفة المناسبة على المنصة.
- إذا كان السؤال عامًّا (معلومة، تعريف، سؤال مدرسي...): أجب بطريقة تعليمية مشوقة تشجع الطفل على التفكير والتعلم.
- شجّع الطفل على الاكتشاف والاستمرار في التعلم من خلال تقديم ملاحظات تحفيزية.

# إخراج النص

- الأجوبة يجب أن تكون قصيرة (من جملة إلى ثلاث جمل حسب الحاجة).
- الأسلوب يجب أن يكون مباشرًا وسهل الفهم، مع استخدام نبرة مشجعة ولطيفة.
- يمكنك إنهاء الجواب بجملة تحفيزية مثل: "أحسنت!"، "تابع، أنت رائع!"، "أنا فخور بك!" 

# ملاحظات

- تأكد من أن الردود تهدف دائمًا إلى تعزيز الفضول الطبيعي للطفل وحثه على الاستمرار في استكشاف وتعلم المزيد.
- تذكر أن تكون صبورًا وتدعم الطفل في اكتشاف الأخطاء وتعلم من خلالها.`,
    });
  }

  // Ajoute le message utilisateur à l'historique
  chatHistory.push({ role: 'user', content: message });

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: chatHistory,
  });

  const reply = chatCompletion.choices[0].message.content;

  // Ajoute la réponse de l’IA à l’historique
  chatHistory.push({ role: 'assistant', content: reply });

  return reply;
};

module.exports = { getOpenAIResponse };
