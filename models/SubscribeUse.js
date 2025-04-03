module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SubscribeUse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    subscribe_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    bundle_id: DataTypes.INTEGER,
    sale_id: DataTypes.INTEGER
  }, {
    tableName: 'subscribe_uses',
    timestamps: false
  });
};