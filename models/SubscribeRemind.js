module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SubscribeRemind', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    subscribe_id: DataTypes.INTEGER,
    created_at: DataTypes.BIGINT
  }, {
    tableName: 'subscribe_reminds',
    timestamps: false
  });
};