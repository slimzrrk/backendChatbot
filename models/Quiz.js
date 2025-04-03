module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Quiz', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    webinar_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    title: DataTypes.STRING(255),
    webinar_title: DataTypes.STRING(64),
    time: DataTypes.INTEGER,
    attempt: DataTypes.INTEGER,
    pass_mark: DataTypes.INTEGER,
    certificate: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('active', 'inactive'),
    total_mark: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER,
    updated_at: DataTypes.INTEGER
  }, {
    tableName: 'quizzes',
    timestamps: false
  });
};