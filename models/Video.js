module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Video', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: DataTypes.STRING(200),
    video: DataTypes.TEXT,
    page: DataTypes.INTEGER,
    description: DataTypes.STRING(200),
    numero: DataTypes.INTEGER,
    manuel_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    thumbnail: DataTypes.STRING(255),
    user_id: DataTypes.INTEGER,
    vues: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    titleAll: DataTypes.STRING(255),
    status: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    total_minutes_watched: DataTypes.DOUBLE(8, 2)
  }, {
    tableName: 'videos',
    timestamps: false
  });
};