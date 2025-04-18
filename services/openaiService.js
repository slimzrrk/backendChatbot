const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Envoie le message à GPT avec tout l'historique de la conversation
 * @param {string} userId - Identifiant unique de l’utilisateur
 * @param {string} message - Message complet de l'utilisateur
 * @param {Array} chatHistory - Historique de conversation [{role, content, matiere, niveau, intent}]
 * @param {Object} context - Contexte extrait (intent, matiere, niveau)
 * @returns {string} - Réponse générée par GPT
 */

const getOpenAIResponse = async (userId, message, chatHistory, context = {}) => {
  chatHistory = chatHistory || [];
  const validHistory = chatHistory.filter(msg => msg.role && ['system', 'user', 'assistant'].includes(msg.role));

  // 🧠 Prompt système principal (instruction de comportement)
  const systemPrompt = {
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

# الرقابة والمحتوى غير المناسب ❌

- لا تجب على أي سؤال يحتوي على كلمات غير لائقة أو خارجة، أو يشير إلى مواضيع غير مناسبة للأطفال مثل: الجنس، العنف، المخدرات، الشتائم، أو أي كلام فاحش أو عدواني.
- إذا ورد سؤال فيه كلمات سيئة أو مواضيع غير مناسبة، أجب بلطف مع تنبيه الطفل أن هذا النوع من الكلام غير مقبول.
- مثال على الرد في هذه الحالة: "أنا هنا لأساعدك في التعلم والمرح فقط! دعنا نختار شيئًا مفيدًا معًا 🌟"

# إخراج النص

- الأجوبة يجب أن تكون قصيرة (من جملة إلى ثلاث جمل حسب الحاجة).
- الأسلوب يجب أن يكون مباشرًا وسهل الفهم، مع استخدام نبرة مشجعة ولطيفة.
- يمكنك إنهاء الجواب بجملة تحفيزية مثل: "أحسنت!"، "تابع، أنت رائع!"، "أنا فخور بك!" 

# ملاحظات

- تأكد من أن الردود تهدف دائمًا إلى تعزيز الفضول الطبيعي للطفل وحثه على الاستمرار في استكشاف وتعلم المزيد.
- تذكر أن تكون صبورًا وتدعم الطفل في اكتشاف الأخطاء وتعلم من خلالها.`
  };

  // 🧩 Prompt secondaire injecté dynamiquement pour guider GPT
  const { intent, matiere, niveau } = context;
  const contextualPrompt = {
    role: 'system',
    content: `🎯 نية الطفل: ${intent || 'غير محددة'}\n📚 المادة: ${matiere || 'غير محددة'}\n🎓 المستوى: ${niveau || 'غير محدد'}\n📝 الرجاء الإجابة بناءً على هذه المعلومات.`
  };

  // ⚙️ Construction du message final
  const messages = [systemPrompt, contextualPrompt, ...validHistory];
  messages.push({ role: 'user', content: message });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('❌ Erreur dans askOpenAI:', error.response?.data || error.message);
    throw new Error('Erreur lors de la communication avec OpenAI');
  }
};

module.exports = { getOpenAIResponse };
