module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ChatbotInteraction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    response: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    tableName: 'chatbot_interactions',
    timestamps: false
  });
};