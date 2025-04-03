module.exports = (sequelize, DataTypes) => {
  return sequelize.define('NotificationStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    notification_id: DataTypes.INTEGER,
    seen_at: DataTypes.INTEGER
  }, {
    tableName: 'notifications_status',
    timestamps: false
  });
};