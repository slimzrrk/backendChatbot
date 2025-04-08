const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const extractEntities = async (message, history = []) => {
  const fullPrompt = `
  مهمتك هي تحديد الكيانات (المواد الدراسية والمستويات) الموجودة في الجملة التالية التي يرسلها الطفل.

  # قائمة الكيانات المتاحة:
  - المواد المدرسية: رياضيات، العربية، الفرنسية، علوم، تاريخ، جغرافيا، الإنجليزية
  - المستويات الدراسية: السنة الأولى، السنة الثانية، السنة الثالثة، السنة الرابعة، السنة الخامسة، السنة السادسة

  # صيغة الإجابة المطلوبة (دون شرح إضافي):
  {
    "matiere": "اسم المادة إن وجد",
    "niveau": "اسم المستوى إن وجد"
  }

  # الجملة:
  "${message}"
  `;

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "أنت مصنف كيانات ذكي. استخرج فقط المعلومات المطلوبة وأرجعها ككائن JSON." },
        { role: "user", content: fullPrompt },
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    const response = result.choices[0].message.content.trim();

    let entities = { matiere: null, niveau: null };
    try {
      entities = JSON.parse(response);
      console.log("📌 Entités détectées avec succès :", entities);
    } catch (parseError) {
      console.error('❌ Erreur de conversion en JSON:', parseError.message);
      console.log("📌 Réponse brute d'OpenAI :", response);
    }

    if (Array.isArray(history) && history.length > 0) {
      if (!entities.niveau || entities.niveau === "undefined") {
        const previousLevel = history.find(h => h.niveau && h.niveau !== "undefined");
        if (previousLevel) {
          entities.niveau = previousLevel.niveau;
        }
      }
    
      if (!entities.matiere || entities.matiere === "undefined") {
        const previousSubject = history.find(h => h.matiere && h.matiere !== "undefined");
        if (previousSubject) {
          entities.matiere = previousSubject.matiere;
        }
      }
    } else {
      console.error('❌ L\'historique fourni n\'est pas un tableau valide ou est vide.');
    }

    return entities;
  } catch (error) {
    console.error('❌ Erreur OpenAI:', error.message);
    return { matiere: null, niveau: null };
  }
};

module.exports = { extractEntities };
