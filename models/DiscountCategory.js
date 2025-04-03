module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DiscountCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discount_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'discount_categories',
    timestamps: false
  });
};