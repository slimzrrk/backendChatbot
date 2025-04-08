const { getOpenAIResponse } = require('../services/openaiService');
const { getHistory, addToHistory } = require('../services/chatMemory');
const { detectIntent } = require('../services/intentService');
const ChatbotService = require('../services/chatbotService');
const db = require('../models');

const askOpenAI = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message ou userId manquant' });
  }

  try {
    const history = await getHistory(userId);

    let intent = null;
    try {
      const intentRaw = await detectIntent(message);
      intent = intentRaw.replace('نية:', '').trim().replace(/"/g, '');
      console.log("🎯 Intention détectée :", intent);
    } catch (error) {
      console.error('❌ Erreur lors de la détection de l\'intention :', error.message);
      intent = 'غير محدد'; // Intention par défaut si une erreur se produit
    }

    const { extractEntities } = require('../services/entityExtractor');
    let entities = await extractEntities(message, userId);
    console.log("📌 Entités détectées :", entities);

    if (!entities.niveau || entities.niveau === "undefined") {
      const previousInteraction = history.slice(-5).reverse().find(h => h.niveau && h.niveau !== "undefined");
      if (previousInteraction) {
        entities.niveau = previousInteraction.niveau;
      }
    }

    if (!entities.matiere || entities.matiere === "undefined") {
      const previousInteraction = history.slice(-5).reverse().find(h => h.matiere && h.matiere !== "undefined");
      if (previousInteraction) {
        entities.matiere = previousInteraction.matiere;
      }
    }

    console.log("📌 Entités après vérification de l'historique :", entities);

    // ✅ Sauvegarde de l'intention et des entités dans la base de données
    const interaction = await db.ChatbotInteraction.create({
      user_id: userId,
      message: message,
      intent: intent,  // ✅ Maintenant l'intent est défini correctement
      matiere: entities.matiere || null,
      niveau: entities.niveau || null,
      created_at: new Date()
    });

    let extractedData = null;
    let dataSummary = null;

    switch (intent) {
      case 'voir_profil_prof':
        extractedData = await ChatbotService.getTeachersWithSubjects(entities.matiere, entities.niveau);
        if (!extractedData || !Array.isArray(extractedData)) {
          dataSummary = "لم أتمكن من العثور على أي معلم حاليًا.";
        } else {
          dataSummary = extractedData.map(t => {
            const matières = (t.webinars || [])
              .map(w => w.Material?.name)
              .filter(Boolean)
              .join(', ');

            return `👨‍🏫 ${t.full_name}${matières ? ` - يدرّس: ${matières}` : ''}`;
          }).join('\n');
        }
        break;

      case 'voir_cours':
        extractedData = await ChatbotService.getDetailedWebinars(entities.matiere, entities.niveau);
        dataSummary = extractedData.map(w => {
          const level = w.SchoolLevel?.name || 'غير محدد';
          const subject = w.Material?.name || 'غير معروف';
          const teacher = w.teacher?.full_name || 'أستاذ غير معروف';
          return `📚 ${w.slug} — مادة: ${subject}، المستوى: ${level}، المدرّس: ${teacher}`;
        }).join('\n');
        break;

      case 'voir_manuels':
        extractedData = await ChatbotService.getDetailedManuels(entities.matiere, entities.niveau);
        dataSummary = extractedData.map(m => {
          const subject = m.Material?.name || 'غير معروف';
          return `📘 ${m.name} — مادة: ${subject}`;
        }).join('\n');
        break;

      case 'voir_quizz':
        extractedData = await ChatbotService.getQuizzesWithWebinars(entities.matiere, entities.niveau);
        dataSummary = extractedData.map(q => {
          const subject = q.Webinar?.Material?.name || 'غير معروف';
          const webinar = q.Webinar?.slug || 'غير معروف';
          return `🧠 ${q.title} — دورة: ${webinar}، مادة: ${subject}`;
        }).join('\n');
        break;

      case 'voir_exercices':
        extractedData = await ChatbotService.getDocumentsByManuel(entities.matiere, entities.niveau);
        dataSummary = extractedData.map(d => `📄 ${d.name} — من كتاب: ${d.Manuel?.name}`).join('\n');
        break;

      case 'voir_meets':
        extractedData = await ChatbotService.getLiveMeetings(entities.matiere, entities.niveau);
        dataSummary = extractedData.map(m => `📺 لقاء مباشر مع: ${m.teacher?.full_name}`).join('\n');
        break;

      case 'aide':
      case 'accueil':
      case 'abonnement_platforme':
      case 'ignorer_contenu':
      case 'autre':
        const simpleReply = ChatbotService.handleSimpleIntent(intent);
        await interaction.update({ response: simpleReply });
        return res.json({ reply: simpleReply });

      default:
        dataSummary = null;
    }

    const prompt = dataSummary
      ? `${message}\n\n🔎 إليك المعلومات المستخرجة من قاعدة البيانات:\n${dataSummary}\n\n📌 الرجاء صياغتها كجواب مشجع ومفهوم لطفل باللغة العربية الفصحى.`
      : message;

    const reply = await getOpenAIResponse(userId, prompt, history);

    await interaction.update({ response: reply });

    res.json({ reply });

  } catch (error) {
    console.error('❌ Erreur dans askOpenAI:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { askOpenAI };
