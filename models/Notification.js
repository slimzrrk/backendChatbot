module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    title: DataTypes.STRING(255),
    message: DataTypes.TEXT,
    sender: DataTypes.ENUM('system', 'admin'),
    type: DataTypes.ENUM('single', 'all_users', 'students', 'instructors', 'organizations', 'group'),
    created_at: DataTypes.INTEGER,
    data: DataTypes.JSON
  }, {
    tableName: 'notifications',
    timestamps: false
  });
};