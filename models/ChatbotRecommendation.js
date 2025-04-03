module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ChatbotRecommendation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    recommended_type: DataTypes.ENUM('teacher', 'course', 'meeting', 'video', 'document'),
    recommended_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    tableName: 'chatbot_recommendations',
    timestamps: false
  });
};