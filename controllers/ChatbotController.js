const { getOpenAIResponse } = require('../services/openaiService');
const { getHistory, addToHistory } = require('../services/chatMemory');
const { detectIntent } = require('../services/intentService');
const ChatbotService = require('../services/chatbotService');

const askOpenAI = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message ou userId manquant' });
  }

  try {
    const history = getHistory(userId);
    const intentRaw = await detectIntent(message);
    const intent = intentRaw.replace('نية:', '').trim().replace(/"/g, '');

    console.log("🎯 Intention détectée :", intent);

    const { extractEntities } = require('../services/entityExtractor');
    const entities = extractEntities(message);
    console.log("📌 Entités détectées :", entities);

    let extractedData = null;
    let dataSummary = null;

    switch (intent) {
      case 'voir_profil_prof':
        extractedData = await ChatbotService.getTeachersWithSubjects();
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
        extractedData = await ChatbotService.getDetailedWebinars();
        dataSummary = extractedData.map(w => {
          const level = w.SchoolLevel?.name || 'غير محدد';
          const subject = w.Material?.name || 'غير معروف';
          const teacher = w.teacher?.full_name || 'أستاذ غير معروف';
          return `📚 ${w.slug} — مادة: ${subject}، المستوى: ${level}، المدرّس: ${teacher}`;
        }).join('\n');
        break;

      case 'voir_manuels':
        extractedData = await ChatbotService.getDetailedManuels();
        dataSummary = extractedData.map(m => {
          const subject = m.Material?.name || 'غير معروف';
          return `📘 ${m.name} — مادة: ${subject}`;
        }).join('\n');
        break;

      case 'voir_quizz':
        extractedData = await ChatbotService.getQuizzesWithWebinars();
        dataSummary = extractedData.map(q => {
          const subject = q.Webinar?.Material?.name || 'غير معروف';
          const webinar = q.Webinar?.slug || 'غير معروف';
          return `🧠 ${q.title} — دورة: ${webinar}، مادة: ${subject}`;
        }).join('\n');
        break;

      case 'voir_exercices':
        extractedData = await ChatbotService.getDocumentsByManuel();
        dataSummary = extractedData.map(d => `📄 ${d.name} — من كتاب: ${d.Manuel?.name}`).join('\n');
        break;

      case 'voir_meets':
        extractedData = await ChatbotService.getLiveMeetings();
        dataSummary = extractedData.map(m => `📺 لقاء مباشر مع: ${m.teacher?.full_name}`).join('\n');
        break;

      case 'abonnement_prof':
        extractedData = await ChatbotService.getTeachersWithFollowers();
        dataSummary = extractedData.map(t => `📌 ${t.full_name} — عدد المتابعين: ${t.Follows.length}`).join('\n');
        break;

      case 'aide':
      case 'accueil':
      case 'abonnement_platforme':
      case 'ignorer_contenu':
      case 'autre':
        const simpleReply = ChatbotService.handleSimpleIntent(intent);
        addToHistory(userId, 'user', message);
        addToHistory(userId, 'assistant', simpleReply);
        return res.json({ reply: simpleReply });

      default:
        dataSummary = null;
    }

    const prompt = dataSummary
      ? `${message}\n\n🔎 إليك المعلومات المستخرجة من قاعدة البيانات:\n${dataSummary}\n\n📌 الرجاء صياغتها كجواب مشجع ومفهوم لطفل باللغة العربية الفصحى.`
      : message;

    const reply = await getOpenAIResponse(userId, prompt, history);

    addToHistory(userId, 'user', message);
    addToHistory(userId, 'assistant', reply);

    res.json({ reply });

  } catch (error) {
    console.error('❌ Erreur dans askOpenAI:', error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { askOpenAI };