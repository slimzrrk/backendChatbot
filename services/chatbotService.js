const db = require('../models');

const ChatbotService = {
  async getTeachersWithSubjects() {
    try {
      const teachers = await db.User.findAll({
        where: { role_name: 'teacher', status: 'active' },
        attributes: ['id', 'full_name', 'avatar', 'bio'],
        include: {
          model: db.Webinar,
          as: 'webinars',
          attributes: ['matiere_id'],
          include: {
            model: db.Material,
            attributes: ['name']
          }
        }
      });
      return teachers;
    } catch (error) {
      console.error("❌ Erreur getTeachersWithSubjects:", error.message);
      return [];
    }
  }
  ,

  async getDetailedWebinars() {
    return await db.Webinar.findAll({
      where: { status: 'active' },
      attributes: ['id', 'slug', 'type', 'price', 'created_at'],
      include: [
        { model: db.Material, attributes: ['name'] },
        { model: db.SchoolLevel, attributes: ['name'] },
        { model: db.User, as: 'teacher', attributes: ['full_name'] }
      ]
    });
  },

  async getDetailedManuels() {
    return await db.Manuel.findAll({
      attributes: ['id', 'name', 'logo', 'created_at'],
      include: {
        model: db.Material,
        attributes: ['name']
      }
    });
  },

  async getQuizzesWithWebinars() {
    return await db.Quiz.findAll({
      where: { status: 'active' },
      attributes: ['id', 'title', 'pass_mark', 'time'],
      include: {
        model: db.Webinar,
        attributes: ['slug'],
        include: {
          model: db.Material,
          attributes: ['name']
        }
      }
    });
  },

  async getDocumentsByManuel() {
    return await db.Document.findAll({
      attributes: ['id', 'name', 'manuel_id', 'pdf'],
      include: {
        model: db.Manuel,
        attributes: ['name']
      }
    });
  },

  async getLiveMeetings() {
    return await db.Meeting.findAll({
      where: { disabled: false },
      include: {
        model: db.User,
        as: 'teacher',
        attributes: ['full_name']
      }
    });
  },

  async getSubscribes() {
    return await db.Subscribe.findAll({
      attributes: ['id', 'days', 'price', 'usable_count', 'level_id']
    });
  },

  async getTeachersWithFollowers() {
    return await db.User.findAll({
      where: { role_name: 'teacher', status: 'active' },
      attributes: ['id', 'full_name'],
      include: {
        model: db.Follow,
        attributes: ['id']
      }
    });
  },

  handleSimpleIntent(intent) {
    const replies = {
      accueil: "👋 أهلاً وسهلاً بك في منصة أبجيم! أنا هنا لمساعدتك في التعلم والمرح 🌟",
      aide: "🧠 يمكنك سؤالي عن الدروس، المعلمين، الكتب، الكويزات أو الاشتراك، وسأجيبك بكل سرور!",
      abonnement_platforme: "📱 للاشتراك في منصة أبجيم، اطلب من ولي أمرك تسجيل الدخول إلى صفحة الاشتراك.",
      ignorer_contenu: "⚠️ هذا النوع من الأسئلة غير مناسب. لنركز على التعلم معًا! 😊",
      autre: "🤔 لم أفهم تمامًا... هل يمكنك إعادة صياغة سؤالك بطريقة أخرى؟"
    };
    return replies[intent] || replies["autre"];
  }
};

module.exports = ChatbotService;