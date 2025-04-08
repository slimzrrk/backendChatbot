module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ChatbotInteraction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.STRING,
    message: DataTypes.TEXT,
    response: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    intent: DataTypes.STRING,     // ✅ Nouvelle colonne pour stocker l'intention détectée
    matiere: DataTypes.STRING,    // ✅ Nouvelle colonne pour stocker la matière détectée
    niveau: DataTypes.STRING      // ✅ Nouvelle colonne pour stocker le niveau détecté
  }, {
    tableName: 'chatbot_interactions',
    timestamps: false
  });
};
