module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Follow', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    follower: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('requested', 'accepted', 'rejected'),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'follows',
    timestamps: false
  });
};