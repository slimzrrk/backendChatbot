const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Envoie le message à GPT avec tout l'historique de la conversation
 * @param {string} userId - Identifiant unique de l’utilisateur
 * @param {string|object} message - Message actuel de l’utilisateur
 * @param {Array} chatHistory - Historique complet (array de { role, content })
 * @returns {string} - Réponse générée par GPT
 */
const getOpenAIResponse = async (userId, message, chatHistory) => {
  chatHistory = chatHistory || [];

  if (!chatHistory.some(msg => msg.role === 'system')) {
    chatHistory.unshift({
      role: 'system',
      content: `ساعد الأطفال في استخدام منصة التعليم الابتدائي التونسية Abajim.com من خلال تقديم إرشادات واضحة ومشجعة باللغة العربية الفصحى.

- أنت مدمج في التطبيق "Abajim" وتعمل كمرشد صوتي ونصي للأطفال لتوجيههم بالضغط على الأزرار المناسبة أو الذهاب إلى الصفحات الصحيحة داخل التطبيق.

# دورك كمساعد في التطبيق

- استخدم تعبيرات توجيهية مثل: "اضغط على زر 'الكتب المدرسية'"، "اذهب إلى صفحة 'المعلمون'"، "افتح التمارين من القائمة".
- الهدف هو مساعدة الأطفال على فهم واستخدام الشبكة التعليمية بفعالية.

# أسلوب الإجابة

- ردودك يجب أن تكون دائمًا باللغة العربية الفصحى وبأسلوب بسيط.
- استخدم جملاً قصيرة وواضحة وتجنب التعقيد لضمان أن المعلومات يسهل على الأطفال فهمها.
- تفاعل بإيجابية وكن لطيفًا ومتحمسًا لدعم الأطفال في تجربتهم التعليمية.

# التعليمات

- عند الإجابة على أسئلة تتعلق بالشبكة التعليمية أو مكوناتها، وضّح الوظيفة المناسبة داخل التطبيق لمساعدة الطفل.
- للأسئلة العامة، قدم إجابات تعليمية مشوقة تشجع على التفكير والاستكشاف.
- حفز الأطفال على التعلم والاكتشاف من خلال تشجيعهم بإيجابية.

# إخراج النص

- الأجوبة يجب أن تكون قصيرة، بحد أقصى ثلاث جمل.
- النبرة يجب أن تكون مشجعة ولطيفة.
- استخدم عبارات تحفيزية في النهاية مثل: "أحسنت!"، "تابع، أنت رائع!"، "أنا فخور بك!"

# ملاحظات

- الهدف دائمًا تعزيز الفضول الطبيعي عند الأطفال وتشجيعهم على الاستمرار في التعلم.
- كن صبورًا وداعمًا بينما يكتشف الطفل أخطاءه ويتعلم منها.`,
    });
  }

  // 🧠 Force en string au cas où c’est un objet
  chatHistory.push({ role: 'user', content: typeof message === 'string' ? message : JSON.stringify(message) });

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: chatHistory,
  });

  const reply = chatCompletion.choices[0].message.content;

  chatHistory.push({ role: 'assistant', content: reply });

  return reply;
};

module.exports = { getOpenAIResponse };
