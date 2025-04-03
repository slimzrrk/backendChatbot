module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    model_type: DataTypes.STRING(255),
    model_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    commission: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'order_items',
    timestamps: false
  });
};