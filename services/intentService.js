const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const detectIntent = async (message) => {
  const fullPrompt = `مهمتك هي تحديد نية الطفل من الجملة التي يرسلها داخل تطبيق Abajim.

# قائمة النوايا المتاحة:
- "voir_cours": طلب مشاهدة دروس.
- "voir_exercices": طلب حل أو تصفح التمارين.
- "voir_meets": استفسار حول الدروس الحيّة أو الاجتماعات مع المعلمين.
- "abonnement_prof": رغبة في الاشتراك في محتوى معلم معين.
- "abonnement_platforme": طلب الاشتراك في المنصة التعليمية Abajim.
- "voir_manuels" : طلب تصفح أو فتح كتاب مدرسي.
- "voir_profil_prof" : طلب رؤية معلومات أو صفحة المعلم.
- "voir_quizz" : طلب بدء أو حلّ كويز.
- "question_generale": سؤال تعليمي عام لا يتعلق بالمنصة.
- "accueil": تحية أو بداية المحادثة.
- "aide": طلب المساعدة أو سؤال عن طريقة استخدام التطبيق.
- "ignorer_contenu": لا توجد نية مفهومة أو المحتوى غير مناسب.
- "autre" : أي نية أخرى غير مذكورة أعلاه.

جملة المستخدم: "${message}"

# التعليمات:
- اقرأ الجملة جيداً.
- حدد النية المناسبة فقط من القائمة أعلاه.
- لا تضف أي تفسير.
- أجب فقط بهذا الشكل:
نية: "اسم_النية"
`;

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "أنت مصنف نيات بسيط، أجب فقط بالنية بدون شرح." },
      { role: "user", content: fullPrompt },
    ],
  });

  return result.choices[0].message.content.trim();
};

module.exports = { detectIntent };
