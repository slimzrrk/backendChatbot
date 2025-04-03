module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'paying', 'paid', 'fail'),
    payment_method: DataTypes.ENUM('card', 'online', 'balance'),
    amount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    total_discount: DataTypes.INTEGER,
    total_amount: DataTypes.INTEGER,
    reference_id: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'orders',
    timestamps: false
  });
};