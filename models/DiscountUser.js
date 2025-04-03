module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DiscountUser', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discount_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'discount_users',
    timestamps: false
  });
};