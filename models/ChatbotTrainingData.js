module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ChatbotTrainingData', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    input_text: DataTypes.TEXT,
    expected_response: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    tableName: 'chatbot_training_data',
    timestamps: false
  });
};